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

export default function RegisterVideo() {
    const formCadastro = useForm({ 
        initialValues: {titulo: "Frost Punk" , url: "https://youtube.com/" }
    });
    const [formVisivel, setFormVisivel] = React.useState(false);
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