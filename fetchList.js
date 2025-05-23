const list = async ()=>{
    try{
        const response = await fetch (
            "https://xxnhehkvqwxwmqmonqhn.supabase.co/functions/v1/functionListar",
            {
                method:'GET',
                headers:{
                    "Content-Type":"application/json",
                    Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4bmhlaGt2cXd4d21xbW9ucWhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjgzODk0MCwiZXhwIjoyMDU4NDE0OTQwfQ.XNxdrDqcyDB7-LLtLuoOaN7OLevGpzjjgBfyVbT4osA",

                }
            }
        );
        if(response.ok){
            return await response.json();
        }else{
            console.erro("error al listar elementos")
            return [];
        }
    }catch(err){
        console.error('Error al llamar a la funcion:', err)
        return [];
    }
};

module.exports = list;