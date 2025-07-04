def call_with_backoff(client, method_name, params, max_retries=5, base_delay=0.5, timeout_limit=20):
    delay = base_delay
    method = getattr(client, method_name)
    total_wait = 0

    for attempt in range(max_retries):
        try:
            return method(**params)
        except ClientError as e:
            if e.response['Error']['Code'] == "ThrottlingException":
                if attempt < max_retries - 1:
                    wait = delay + random.uniform(0, 1)
                    total_wait += wait
                    if total_wait > timeout_limit:
                        raise TimeoutError(
                            "Exceeded total retry timeout limit.")
                    print(f"[Retry] Throttled. Waiting {wait:.2f}s...")
                    time.sleep(wait)
                    delay *= 2
                else:
                    raise Exception("Max retries reached due to throttling.")
            else:
                raise
