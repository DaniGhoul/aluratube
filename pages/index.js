import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";

// npm run dev para abrir a página no navegador

function HomePage() {
    const estilosDaHomePage = {
        // backgroundColor: "red"
    };
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({}); //config.playlists

    React.useEffect(() => {
        console.log("useEffect");
        service
            .getAllVideos()
            .then((dados) => {
                console.log(dados.data);
                // Forma imutavel
                const novasPlaylists = {};
                dados.data.forEach((video) => {
                    if(!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                    novasPlaylists[video.playlist] = [
                        video,
                        ...novasPlaylists[video.playlist],
                    ];
                });
                setPlaylists(novasPlaylists);
            });
    }, []);

    console.log("Playlists pronto", playlists);
  
    return (
        <>   
            <div style={estilosDaHomePage}>
                {/* Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>    
                <Header />
                {/* Aqui eu defino as playlists que estão aparecendo na página */}
                <Timeline searchValue={valorDoFiltro} playlists={playlists} />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
            </div>
        </>

    );
}
  
export default HomePage

//function Menu() {
//    return (
//        <div>Menu</div>
//    )
//}

const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    /* background-image: url(${config.bg}); outra forma de fazer isso*/
    height: 230px;
`;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
            <img src={`https://github.com/${config.github}.png`} />
            <div>
                <h2>
                    {config.name}
                </h2>
                <p>
                    {config.job}
                </p>            
            </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({searchValue, ...props}) {
    // console.log("Dentro do componente", props.playlists);
    const playlistNames = Object.keys(props.playlists);

    return (
        <StyledTimeline>
            {playlistNames.map(function(playlistName) {
                const videos = props.playlists[playlistName];
                // console.log(playlistName);
                // console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}