document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');

    if (!countrySelect) return; // Only run on pages with the country dropdown

    const headers = new Headers();
    headers.append("X-CSCAPI-KEY", "YOUR_API_KEY"); // Replace with your key if needed, some APIs are public

    // Fetch Countries
    axios.get('https://api.countriesnow.space/api/v0.1/countries/positions')
        .then(response => {
            const countries = response.data.data;
            countries.forEach(country => {
                const option = new Option(country.name, country.name);
                countrySelect.add(option);
            });

            // If editing, set the previously saved country
            if (existingLocation.country) {
                countrySelect.value = existingLocation.country;
                countrySelect.dispatchEvent(new Event('change'));
            }
        })
        .catch(error => console.error('Error fetching countries:', error));

    // Handle Country Change -> Fetch States
    countrySelect.addEventListener('change', () => {
        stateSelect.innerHTML = '<option value="">Select State</option>';
        citySelect.innerHTML = '<option value="">Select City</option>';
        stateSelect.disabled = true;
        citySelect.disabled = true;

        const selectedCountry = countrySelect.value;
        if (selectedCountry) {
            axios.post('https://api.countriesnow.space/api/v0.1/countries/states', { country: selectedCountry })
                .then(response => {
                    const states = response.data.data.states;
                    if (states && states.length > 0) {
                        states.forEach(state => {
                            const option = new Option(state.name, state.name);
                            stateSelect.add(option);
                        });
                        stateSelect.disabled = false;
                        
                        // If editing, set the previously saved state
                        if (existingLocation.state) {
                            stateSelect.value = existingLocation.state;
                            stateSelect.dispatchEvent(new Event('change'));
                        }
                    }
                })
                .catch(error => console.error('Error fetching states:', error));
        }
    });

    // Handle State Change -> Fetch Cities
    stateSelect.addEventListener('change', () => {
        citySelect.innerHTML = '<option value="">Select City</option>';
        citySelect.disabled = true;

        const selectedCountry = countrySelect.value;
        const selectedState = stateSelect.value;
        if (selectedState) {
            axios.post('https://api.countriesnow.space/api/v0.1/countries/state/cities', { country: selectedCountry, state: selectedState })
                .then(response => {
                    const cities = response.data.data;
                    if (cities && cities.length > 0) {
                        cities.forEach(city => {
                            const option = new Option(city, city);
                            citySelect.add(option);
                        });
                        citySelect.disabled = false;
                        
                        // If editing, set the previously saved city
                        if (existingLocation.city) {
                           citySelect.value = existingLocation.city;
                        }
                    }
                })
                .catch(error => console.error('Error fetching cities:', error));
        }
    });
});