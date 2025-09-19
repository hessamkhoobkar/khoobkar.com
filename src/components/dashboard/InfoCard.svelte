<script lang="ts">
	// import Cover from '@/assets/images/cover.jpg';
	import Profile from '@/assets/images/profile-pic.png';
</script>

<div
	class="col-span-1 md:col-span-6 xl:col-span-8 bg-gray-800 shadow-lg shadow-gray-900 rounded-2xl p-2"
>
	<!-- Cover -->
	<div class="relative w-full min-h-52">
		<img
			class="object-cover w-full min-h-52 rounded-xl border-2 border-gray-900"
			src="https://utfs.io/f/04f8bf57-4581-4578-870d-db0f25e8daeb-1kh0af.jpg"
			alt="The cover for my info section inmcluding my handdrwan ux work in my leather notebook and papaer cards with some woods and other props around them on a balck background"
		/>
		<div class="absolute inset-0 rounded-xl bg-gradient-to-t from-gray-900"></div>
		<div class="absolute bottom-6 md:bottom-2 left-32 flex flex-col justify-start items-start">
			<span class="text-sm">hessam khoobkar</span>
			<span class="font-bold">UI designer / Front-end Developer</span>
		</div>
	</div>
	<div class="relative">
		<img
			class="rounded-xl absolute -top-32 md:-top-14 h-24 w-24 border-2 border-gray-900 left-4"
			src={Profile}
			alt="Me standing in front of some histrorical building with perisan style design in blue and cyan colors"
		/>
		<p class="md:ml-32 mt-3 pr-4 mb-4 text-sm leading-normal">
			I am a front-end developer with a strong focus on building user interfaces and components. My
			expertise lies in converting design concepts and ideas into functional front-end code that is
			visually appealing and user-friendly. I have a keen eye for detail and take pride in
			delivering high-quality work that meets or exceeds client expectations. My dedication to my
			craft and passion for creating beautiful and intuitive UIs make me an invaluable asset to any
			team or project.
		</p>
	</div>
</div>
