/// <reference types="vite/client" />

// Declaração de tipos para importação de SVG
declare module '*.svg' {
  const content: string
  export default content
}

// Declaração de tipos para importação de SVG como URL
declare module '*.svg?url' {
  const content: string
  export default content
}

// Declaração de tipos para assets de imagem
declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module '*.webp' {
  const content: string
  export default content
}
