 const useSearchedCards = async (searchedData) => {
    // {searchText: '', selectedCategories: Array(0), distance: null, minPrice: null, maxPrice: null}
     
        try{
           
            let response=await fetch('/api/getProducts',{
                method:'post',
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body: JSON.stringify(searchedData),
            })
            response=await response.json()
            console.log(response)
            
            return response;
        }
       catch(e){
            console.log("error in useSearchedCard Hook",e)
            return null;
       }
    
      
 
}

export default useSearchedCards