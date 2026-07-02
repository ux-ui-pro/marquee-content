declare module '*.css' {
  const cssUrl: string;
  export default cssUrl;
}

declare module '*.css?inline' {
  const cssText: string;
  export default cssText;
}
