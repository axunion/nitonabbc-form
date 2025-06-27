export default function RecaptchaNotice() {
	return (
		<div class="px-4 text-xs text-gray-400">
			This site is protected by reCAPTCHA and the Google{" "}
			<a
				href="https://policies.google.com/privacy"
				target="_blank"
				rel="noopener noreferrer"
				class="text-blue-400"
			>
				Privacy Policy
			</a>{" "}
			and{" "}
			<a
				href="https://policies.google.com/terms"
				target="_blank"
				rel="noopener noreferrer"
				class="text-blue-400"
			>
				Terms of Service
			</a>{" "}
			apply.
		</div>
	);
}
