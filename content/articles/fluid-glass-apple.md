> 本文同步自掘金，完整配图与全文源码见文末链接。

## 文章在讲什么

围绕 **「苹果液态玻璃」类视觉效果**，对比几种前端实现路线，并深入拆解其中较完整的一条：**Three.js + React Three Fiber（R3F）+ FBO 离屏渲染 + `MeshTransmissionMaterial` 体透射折射**（文中称 Fluid Glass）。

核心结论可以概括为：

1. **纯图片 / SVG 滤镜**：上手快，但对真实 HTML 内容折射、边缘平滑度、色散表现有限。
2. **WebGL / Three.js 3D 玻璃**：成本高，但能做法线级折射、厚度、IOR、色散，适合「透镜跟着鼠标动」的展示型页面。

---

## 方案对比（作者归纳）

| 路线 | 优点 | 局限 |
|------|------|------|
| 基于图片的液态实现（如 iyinchao/liquid 类方案） | 效果抢眼 | 多针对位图，**难以对 live DOM/HTML 做同样折射** |
| SVG 滤镜（如 vue-bits 等） | 实现简单 | 平滑度、毛边、色偏问题 |
| **Three.js + FBO + 透射材质** | 真 3D 光学参数、可滚动画廊 + 玻璃体 | 包体、性能、资源（glb）、实现复杂度高 |

---

## 渲染管线（读懂这一节就够面试/分享）

### 数据流

1. 背景内容（文字、图片画廊）不直接画在主屏上。
2. 用 **`createPortal`** 挂到**独立离屏 `Scene`**。
3. 每帧在 **`useFrame`** 里：先把离屏场景 **`gl.render` 进 FBO**（`useFBO()`），得到 `buffer.texture`。
4. 主场景里：
   - **全屏平面** + `meshBasicMaterial(map=buffer)`：显示「没被玻璃挡住」的底图；
   - **玻璃网格** + `MeshTransmissionMaterial(buffer=buffer)`：按法线、**IOR、厚度、色散** 对同一张纹理做折射采样。

### 为什么指针要自己做 NDC

外层有 Drei 的 `ScrollControls`，会干扰默认指针事件。作者在 canvas 上监听 `pointermove`，用 `getBoundingClientRect` 把坐标转成 **NDC [-1, 1]**，再映射到 `Z=15` 切平面上的世界坐标（`viewport.getCurrentViewport(camera, [0,0,15])`），并用 `easing.damp3` 做跟随惯性。

### 双材质分工

| 层 | 材质 | 作用 |
|----|------|------|
| 底图 | `meshBasicMaterial` + FBO 纹理 | 1:1 铺满视口，未折射区域 |
| 玻璃 | `MeshTransmissionMaterial` + 同一纹理 | 物理向折射/透射采样 |

---

## 产品结构（便于你对照 Demo）

- **`mode`**：`lens` / `cube` / `bar` 三种 glb 几何，透镜跟鼠标，`bar` 固定底部像毛玻璃导航。
- **`Images` + `ScrollControls`**：滚动驱动图片 zoom，内容在离屏场景里，供玻璃折射。
- **`Typography` / `NavItems`**：响应式字号与底部导航排版。

文中还给了一张 **Fluid Glass vs Studio 四 Pass GLSL vs SVG** 的对比表，适合作为技术选型备忘。

---

## 放到个人站 / 项目里要注意什么

1. **静态托管（GitHub Pages）**：需要把 `glb`、贴图放进 `public/`，注意 **basePath** 前缀（你的站是 `/personal-site/`）。
2. **性能**：全屏 Canvas + 每帧 FBO + 透射材质，移动端要降级或 `prefers-reduced-motion`。
3. **可访问性**：纯 WebGL 背景时，正文尽量保留 **HTML 层**（Drei 的 `Scroll html`）或提供关闭动效开关。
4. **版权**：全文含大段完整组件源码，个人站建议 **摘要 + 链接原文**，避免与掘金版本完全重复 SEO。

---

## 延伸阅读

- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [@react-three/drei — MeshTransmissionMaterial](https://github.com/pmndrs/drei)
- 原文（掘金）：[苹果的液态玻璃咋做？](https://juejin.cn/post/7678529068804554787)
