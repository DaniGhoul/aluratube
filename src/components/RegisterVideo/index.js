import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

// Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return{
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

const PROJECT_URL = "https://lfrbanpizphxpgkglfmj.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmcmJhbnBpenBoeHBna2dsZm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNzk1NDgsImV4cCI6MTk4Mzg1NTU0OH0.LlfBSMTiRnkaxzqIEafwuLtjXzG0wQb4wdzyUod5HSw";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getVideoId(url) {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
        return videoId.substring(0, ampersandPosition);
    }
    return videoId;
}

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const formCadastro = useForm({ 
        initialValues: {titulo: "Frost Punk" , url: "https://www.youtube.com/watch?v=QsqatJxAUtk" }
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    console.log(supabase.from("video").insert());

    // [X]Falta o botão para adicionar
    // [X]Modal
    // [X]Precisamos controlar o state
    // -> Formulário em si: pegar dados que precisam vir do state, onSubmit no form, limpar form após submit
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel 
                ? (
                                <form onSubmit={(evento) => {
                                    evento.preventDefault();
                                    console.log(formCadastro.values);

                                    supabase.from("video").insert({
                                        title: formCadastro.values.titulo,
                                        url: formCadastro.values.url,
                                        thumb: getThumbnail(formCadastro.values.url),
                                        playlist: "jogos",
                                    })
                                    .then((oqueveio) => {
                                        console.log(oqueveio);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })

                                    setFormVisivel(false);
                                    formCadastro.clearForm();
                                }}>
                                <div>
                                    <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                        x
                                    </button>
                                    <input 
                                        placeholder="Titulo do vídeo" 
                                        name="titulo"
                                        value={formCadastro.values.titulo} 
                                        onChange={formCadastro.handleChange} 
                                    />
                                    <input 
                                        placeholder="URL" 
                                        name="url"
                                        value={formCadastro.values.url} 
                                        onChange={formCadastro.handleChange} 
                                    />
                                    <button type="submit">
                                        Cadastrar
                                    </button>
                                </div>
                            </form>
                )
                : false}
        </StyledRegisterVideo>
    )
}