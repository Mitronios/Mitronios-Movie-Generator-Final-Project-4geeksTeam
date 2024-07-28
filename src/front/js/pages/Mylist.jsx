import React, { useContext, useEffect } from "react";
import "../../styles/mylist.css";
import { Context } from "../store/appContext";

export const Mylist = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getMovieList();
    }, []);

    const handleRemoveMovie = async (movieId) => {
        const success = await actions.deleteMovieFromList(movieId);
        if (!success) {
            console.error('Failed to remove movie');
        }
    }

    return (
        <div className="d-flex flex-wrap justify-content-center vw-100 p-3 m-3 gap-2 parallax-mylist">
            {store.token ? (
                store.movielist && store.movielist.length > 0 ? (
                    <div className="container row row-cols-1 row-cols-md-4 g-4">
                        {store.movielist.map((movielist) => (
                            <div style={{ maxWidth: "21rem" }} key={movielist.id} className="card card__movie mb-3 text-light d-flex flex-column">
                                <img className="card-img-top" src={movielist?.movie.img_url} alt={movielist?.movie.title} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{movielist?.movie.title}</h5>
                                    <div className="mt-auto">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleRemoveMovie(movielist.movie.id)}
                                        >
                                            Quitar de la lista
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-info text-center" role="alert">
                        No movies in your list. Start adding some!
                    </div>
                )
            ) : (
                <div className="mt-5 alert alert-success text-center h-25" role="alert">
                    Usuario no autenticado
                    <br />
                    INICIA SESIÓN PARA ACCEDER A TU LISTA PERSONALIZADA
                </div>
            )}
        </div>
    );
};