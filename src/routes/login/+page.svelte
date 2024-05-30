<script>
	import '../../app.css';
	import { login } from '$lib/api/auth.js';
	import { validateEmail } from '$lib/utils/validate.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getUserToken } from '$lib/utils/storeAccount.js';

	let email = '';
	let password = '';
	let isSubmitting = false;
	let error = null;

	// let user;
	// const unsub = localUser.subcribe((value) => {
	// 	user = value;
	// });

	onMount(() => {
		if (getUserToken()) {
			goto('/me');
		}
	});

	const handleSubmit = async (e) => {
		isSubmitting = true;
		try {
			e.preventDefault();
			if (!email || !password) return (error = 'Please fill in all fields');
			if (!validateEmail(email)) return (error = 'Email không hợp lệ');
			const res = await login({ email, password });
			// redirect to home page
			goto('/me');
		} catch (err) {
			error = err.msg;
			isSubmitting = false;
		}
	};
</script>

<div class="flex h-[100vh] overflow-hidden items-center justify-center flex-col sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<img class="mx-auto max-h-32 w-auto" src="/images/logo.png" alt="Your Company" />
		<h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-[#FF204E]">
			Let's begin with us in the cute world
		</h2>
	</div>

	<div class="sm:mx-auto sm:w-full sm:max-w-[480px]">
		<div class="bg-white px-6 py-6 shadow sm:rounded-lg sm:px-12">
			<div class="space-y-6" action="#" method="POST">
				<div>
					<label for="email" class="block text-sm leading-6 text-gray-900 font-bold"
						>Địa chỉ Email</label
					>
					<div class="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							bind:value={email}
							class="block w-full font-bold outline-none px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF204E] sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<label for="password" class="font-bold block text-sm leading-6 text-gray-900"
						>Mật khẩu</label
					>
					<div class="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required
							bind:value={password}
							class="block w-full outline-none px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF204E] sm:text-sm sm:leading-6"
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
						<label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900"
							>Remember me</label
						>
					</div>

					<div class="text-sm leading-6">
						<a href="#!" class="font-bold text-[#ff204dbd] hover:text-[#FF204E]">Quên mật khẩu?</a>
					</div>
				</div>

				<div>
					<button
						on:click={handleSubmit}
						type="submit"
						class="flex w-full justify-center rounded-md bg-[#FF204E] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>{!isSubmitting ? 'Đăng nhập' : 'Đợi xíu...'}</button
					>
					<button
						on:click={() => {
							goto('signup');
						}}
						class="mt-2 flex w-full font-bold justify-center rounded-md bg-transparent px-3 py-1.5 text-sm leading-6 text-[#FF204E] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>Tạo tài khoản</button
					>
				</div>
			</div>
			<!-- error box -->
			{#if error}
				<div class="mt-4">
					<p class="text-[#FF204E] text-[12px] font-bold">{error}</p>
				</div>
			{/if}
		</div>
	</div>
</div>
