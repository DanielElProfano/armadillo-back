/**
 * Este es nuestro middleware para comprobar si el usuario está autenticado.
 * Usaremos la función req.isAuthenticated() que nos añade previamente passport
 * a nuestro objeto request. Si el usuario no está logueado, lo redireccionaremos a login.
 * Si el usuario si está logueado, continuaremos ejecutando nuestro código.
 * 
 * Un middleware no es más que una función que se ejecuta antes del controlador. Si
 * esta función llama a next(), se ejecutará el controlador pero si no llama a next(), el servidor
 * hará el comportamiento que nosotros programemos
 */
const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
      return next();  
    } else {
        return res.send(403);
    }
};

/**
 * Middleware para comprobar si nuestro usuario es administrador.
 */
const isAdmin = (req, res, next) => {
    console.log(req.passport);
    if(req.user.role === 'admin') {
        return next();
    } else {
        return res.send(403);
    }
}

module.exports = {
    isAuthenticated,
    isAdmin,
}