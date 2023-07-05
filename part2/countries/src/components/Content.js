const Content = ({countries, setCountries}) => {
    if (countries.length > 10){
        return (
            <div>Too many matches, specify another filter!</div>
        )
    }
    else if (countries.length >= 2){
        return (
            <div>
                {countries.map(country => <li>{country.name}</li>)}
            </div>
        )
    }
}

export default Content