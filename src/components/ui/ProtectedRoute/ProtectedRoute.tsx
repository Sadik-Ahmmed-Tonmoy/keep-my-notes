import { getTokenFromLocalStorage } from '@/utils/tokenHandler';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';

const ProtectedRoute = ({children} : {children: React.ReactNode}) => {

    const router = useRouter();
    
    const token = getTokenFromLocalStorage();
    if(!token){
        Swal.fire({
            position: "center",
            icon: "info",
            title: "Please login to access the dashboard",
            showConfirmButton: false,
            timer: 1500
          });
        router.push('/login');
    }

    return children
};

export default ProtectedRoute;