function BtnIngresar({title}:{title:string}){
    return(
        <button>{title}</button>
    );
}

export default function App (){
    return(
        <div>
            <h1>LuxSense</h1>
            <BtnIngresar title = "Ingresar"/>

            <div>

            
            </div>
            
        </div>
    );
}