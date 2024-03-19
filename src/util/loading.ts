import { ElLoading } from "element-plus";

let loading :any;

export function show() {
  loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
}


export function dismiss() {
  loading?.close()
}

