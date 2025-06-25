export default function Greet({name, greet="Welcome to React!"}) {
  

    const greeting = `Hello ${name}, ${greet}`;
    return(
        <h1>{greeting}</h1>
    )
}