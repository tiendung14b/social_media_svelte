<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { signup } from '$lib/api/auth.js';
	import { save } from '$lib/utils/storeAccount.js';
	import '../../app.css';

	let first_name = '';
	let last_name = '';
	let email = '';
	let password = '';
	let repassword = '';
	let isSubmitting = false;
	let error = null;
	let mounted = false;

	const handleSubmit = async () => {
		console.log(grecaptcha);
		if (!grecaptcha || grecaptcha.getResponse().length === 0) {
			error = 'Vui lòng xác nhận bạn không phải là robot';
			return;
		}
		isSubmitting = true;
		if (!email || !password || !repassword || !first_name || !last_name) {
			error = 'Vui lòng điền đầy đủ thông tin';
			isSubmitting = false;
			return;
		}
		if (password !== repassword) {
			error = 'Mật khẩu không khớp';
			isSubmitting = false;
			return;
		}
		const res = await signup({ email, password, first_name, last_name });
		if (res.error) {
			error = res.msg;
			isSubmitting = false;
			return;
		}
		save(res);
		goto('/');
	};
</script>

<div class="flex min-h-[100vh]">
	<div
		class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
	>
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<div>
				<img class="h-28 w-auto" src="/images/logo.png" alt="Your Company" />
				<h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-[#FF204E]">
					Tạo tài khoản
				</h2>
			</div>

			<div class="mt-10">
				<div>
					<div action="#" method="POST" class="space-y-6">
						<div class="grid grid-cols-2 gap-5">
							<div>
								<label for="email" class="block text-sm font-bold leading-6 text-gray-900"
									>First name</label
								>
								<div class="mt-2">
									<input
										id="first_name"
										name="first_name"
										type="text"
										bind:value={first_name}
										required
										class="block w-full font-bold rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label for="email" class="block text-sm font-bold leading-6 text-gray-900"
									>Last Name</label
								>
								<div class="mt-2">
									<input
										id="last_name"
										name="last_name"
										type="text"
										bind:value={last_name}
										required
										class="block w-full font-bold rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>

						<div>
							<label for="email" class="block text-sm font-bold leading-6 text-gray-900"
								>Địa chỉ Email</label
							>
							<div class="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									bind:value={email}
									autocomplete="email"
									required
									class="block w-full font-bold rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label for="password" class="block text-sm font-bold leading-6 text-gray-900"
								>Mật khẩu</label
							>
							<div class="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									bind:value={password}
									autocomplete="current-password"
									required
									class="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label for="password" class="block text-sm font-bold leading-6 text-gray-900"
								>Nhập lại mật khẩu</label
							>
							<div class="mt-2">
								<input
									id="repassword"
									name="repassword"
									type="password"
									bind:value={repassword}
									autocomplete="current-password"
									required
									class="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div class="flex items-center justify-between">
							<div class="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
								/>
								<label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-700"
									>Remember me</label
								>
							</div>
						</div>
						<div
							class="g-recaptcha"
							id="g-recaptcha"
							data-sitekey="6LcWSvwpAAAAAFXUHMj88N3sn9E75Nnnb1s1rejt"
						></div>
						<div>
							<button
								on:click={handleSubmit}
								type="submit"
								class="flex w-full justify-center rounded-md bg-[#FF204E] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>{isSubmitting ? 'Đợi xíu...' : 'Đăng ký'}
							</button>

							<button
								on:click={() => {
									goto('login');
								}}
								class="mt-2 flex w-full justify-center rounded-md bg-transparent px-3 py-1.5 text-sm font-semibold leading-6 text-[#FF204E] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>Đã có tài khoản</button
							>
						</div>
					</div>
					{#if error}
						<div class="mt-4">
							<p class="text-[#FF204E] text-[12px] font-bold">{error}</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="relative hidden w-0 flex-1 lg:block">
		<img
			class="absolute inset-0 h-full w-full object-cover"
			src="https://pbs.twimg.com/media/DALjIC9VwAIkdqO?format=jpg&name=medium"
			alt=""
		/>
	</div>
</div>
