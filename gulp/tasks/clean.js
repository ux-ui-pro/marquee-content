import del from 'del'

export const clean = () => {
    return del(app.path.clean)
}
