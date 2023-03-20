import gulp from 'gulp'
import { path } from './gulp/config/path.js'
import { plugins } from './gulp/config/plugins.js'
import { server } from './gulp/tasks/server.js'
import { clean } from './gulp/tasks/clean.js'
import { js } from './gulp/tasks/js.js'
import { html } from './gulp/tasks/html.js'

global.app = {
    projectDev: process.argv.includes('--build'),
    projectBuild: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

function watcher() {
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.html, html)
}

const mainTasks = gulp.parallel(js, html)
const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(clean, mainTasks)

export { dev }
export { build }

gulp.task('default', dev)
