

const PlayerCard=({player})=>{
    return(
        <div className="">
            <div>
                <span>{player.rating}</span>
                <span>{player.position}</span>
            </div>
            
            <img src={player.image} alt={player.name} className=""/>

            <h3 className="">{player.name}</h3>

            <div className="">
                {Player.position=="GK"?(
                <>
                <span>DIV: {player.diving}</span>
                <span>REF: {player.reflexes}</span>
                <span>HAN: {player.handling}</span>
                <span>POS: {player.positioning}</span>
                <span>KIC: {player.kicking}</span>
                </>
                ):(
                    <>
                      <span>PAC: {player.pace}</span>
                      <span>SHO: {player.shooting}</span>
                      <span>PAS: {player.passing}</span>
                      <span>DEF: {player.defense}</span>
                      <span>PHY: {player.physical}</span>
                    </>
                )
              }
            </div>
        </div>
    );
}

export default PlayerCard