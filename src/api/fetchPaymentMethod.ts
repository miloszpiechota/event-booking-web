import { supabase } from '../../supabaseClient.ts'; 


export const fetchPaymentMethod = async () => {
    const{data,error} = await supabase.from('payment_method').select('*');
    if(error){
        console.error('Error fetching payment_method:',error);
        return [];
    }
    return data;

};

