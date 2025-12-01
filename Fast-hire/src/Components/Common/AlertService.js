import React from 'react';
import Swal from 'sweetalert2';
import './AlertZIndex.css';

export const AlertService = {
  success: (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
      confirmButtonColor: '#3085d6',
      customClass: { container: 'swal2-z-top' },
    });
  },

  error: (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message,
      confirmButtonColor: '#d33',
      customClass: { container: 'swal2-z-top' },
    });
  },

  warning: (message) => {
    Swal.fire({
      icon: 'warning',
      title: 'Warning!',
      text: message,
      confirmButtonColor: '#3085d6',
      customClass: { container: 'swal2-z-top' },
    });
  },

  confirm: async (message) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      customClass: { container: 'swal2-z-top' },
    });
    return result.isConfirmed;
  },
};

// Default export: a lightweight React component (renders null) so you can import and mount it if desired.
// Keeps file as a JSX module per request.
export default function AlertServiceComponent() {
  // The component doesn't need to render UI — CSS import above ensures z-index class is available.
  return null;
}
