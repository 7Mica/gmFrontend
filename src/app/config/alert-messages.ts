import swal from 'sweetalert2';

export class AlertMessages {

    static showToast(text: string, title: string, duration: any, type: any) {

        swal({
            toast: true,
            position: 'top-end',
            text: text,
            title: title,
            timer: duration,
            type: type,
            showConfirmButton: false,
        });
    }
}
