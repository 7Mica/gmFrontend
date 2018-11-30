export const URL_SERVICIOS = 'http://localhost:3000';


/****************************
 * CONFIGURACION DATATABLES *
 ****************************/
export const DTCONFIG_DELETE_EDIT_BTNS = {
    mode: 'external',
    columns: {},
    noDataMessage: 'No hay datos disponibles',
    attr: {
        class: 'display nowrap table table-hover table-striped table-bordered'
    },
    actions: {
        columnTitle: '',
        add: false,
        position: 'right',
        custom: [],
    },
    edit: {
        editButtonContent: '<span class="btn btn-success tbl-button"><i title="Editar" class="fa fa-pencil"></i></span>'
    },

    delete: {
        deleteButtonContent: '<span class="btn btn-danger"><i title="Eliminar" class="fa fa-times"></i></span>'
    }
};

/**********************
 * CONFIGURACION SWAL *
 **********************/

/**
 * @property text Cuerpo del mensaje
 * @property type Tipo de mensaje
 */
export const SWALCONFIG_CONFIRMDELETE: any = {

    title: '¿Estás seguro?',
    text: 'Se eliminará permamentemente el',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'No, Cancelar'
};

export const SWALCONFIG_TOAST: any = {
    toast: true,
    type: 'success',
    showConfirmButton: false,
    position: 'top-end',
    title: 'Se eliminó el registro',
    timer: 4000
};
