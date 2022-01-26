import {ref} from 'vue';

const postAPI = () => {
     const apiURL = process.env.VUE_APP_API_URL;
     const data = ref(null);
     const error = ref(null);

     const accessAPI = async (endpoint) => {
          try {
               let res = await fetch(`${apiURL}/${endpoint}`,{
                    method :"POST"
               });
               if(!res.ok){
                    throw Error("Could not fetch data");
               }
               data.value = await res.json();
          } catch (err) {
               error.value = err.message;
          }
     }
     return {data, error, accessAPI};
}

export default postAPI;