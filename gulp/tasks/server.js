export const server = () => {
    app.plugins.browserSync.init({
        server: {
            baseDir: `${app.path.build.html}`
        },
        notify: false,
        port: '7777'
    })
}
