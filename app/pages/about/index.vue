<template>
    <div class="mx-auto max-w-3xl py-10 px-5 flex flex-col gap-3 items-center">
        <img src="/portrait.png" alt="portrait" class="rounded-xl w-2xs">
        <p class="font-bold font-serif text-2xl">小明同学</p>
        <UButton color="primary" icon="ant-design:github-filled" variant="link" size="xl"
            to="https://github.com/coder-xmtx"></UButton>
        <USeparator label="SAY" class="w-2xs font-serif" />
        <div class="font-write text-xl">
            <p>Je t'aime encore,</p>
            <p>Mais le monde pleure sans fin.</p>
        </div>
        <UButton icon="i-lucide-arrow-left" size="md" variant="outline" to="/" color="primary">返回首页
        </UButton>
    </div>
</template>