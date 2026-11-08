<template>
    <div class="relative min-h-dvh">
        <!-- 背景层：fixed 铺满全屏，滚动时保持不动 -->
        <div class="fixed inset-0 z-0 pointer-events-none">
            <GradientWaves horizonColor="#663600" waveColor="#f5a000" crestColor="#ffefc2" :speed="0.3" :amplitude="2.5"
                :waveScale="0.65" :waveRatio="0.9" :swell="35" :turbulence="20" :tilt="1.1" :zoom="2.0" :height="5.5"
                :fogDepth="15" detail="medium" :brightness="1.0" :opacity="1.0" :mouseInteraction="false"
                :parallaxStrength="0.5" :grain="true" :grainIntensity="0.05" />
        </div>

        <!-- 内容层 -->
        <div class="relative z-10 min-h-dvh flex flex-col items-center justify-center gap-6 px-6 text-center">
            <h1 class="font-bold text-5xl font-header text-gold-200">Mixsu Studio</h1>
            <div class="flex flex-col items-center gap-3 font-serif">
                <p>-- 让生活慢下来 --</p>
            </div>
        </div>
    </div>
</template>