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
        <main>
            <slot />
        </main>
    </div>
</template>