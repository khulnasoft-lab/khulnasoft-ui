<template>
  <div>
    <gl-gauge-chart
      :value="48"
      text="48Mbps"
      :min="0"
      :max="100"
      :thresholds="[38, 82]"
      :split-number="10"
    />
  </div>
</template>
