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
        editButtonContent: '<span class="btn btn-facebook tbl-button"><i title="Editar" class="fa fa-pencil"></i></span>'
    },

    delete: {
        deleteButtonContent: '<span class="btn btn-danger"><i title="Eliminar" class="fa fa-times"></i></span>'
    }
};

export const TABLE = {
    mode: 'external',
    columns: {},
    noDataMessage: 'No hay datos disponibles',
    attr: {
        class: 'display nowrap table table-hover table-striped table-bordered'
    },
    pager: {
        perPage: 5
    },
    actions: {
        columnTitle: '',
        add: false,
        edit: false,
        delete: false,
        new: false,
        position: 'right',
        custom: [],
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
    text: 'Se eliminará permamentemente el registro?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
};

export const SWALCONFIG_ALERT: any = {

    title: '¿Estás seguro?',
    text: 'Se eliminará permamentemente el',
    type: 'warning',
};
export const SWALCONFIG_TOAST: any = {
    toast: true,
    type: 'success',
    showConfirmButton: false,
    position: 'top-end',
    text: '',
    title: 'Se eliminó el registro',
    timer: 4000
};

export const IMAGEHOSTUSUARIO  = 'http://localhost:3000/usuario/img/';
export const IMAGEHOSTUSUARIOEVENTO  = 'http://localhost:3000/usuarioevento/img/';
export const IMAGEHOSTCROQUIS  = 'http://localhost:3000/evento/img/croquis/';
