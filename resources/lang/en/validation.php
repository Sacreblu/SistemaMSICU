<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'The :attribute must be accepted.',
    'active_url' => 'The :attribute is not a valid URL.',
    'after' => 'The :attribute must be a date after :date.',
    'after_or_equal' => 'The :attribute must be a date after or equal to :date.',
    'alpha' => 'The :attribute may only contain letters.',
    'alpha_dash' => 'The :attribute may only contain letters, numbers, dashes and underscores.',
    'alpha_num' => 'The :attribute may only contain letters and numbers.',
    'array' => 'The :attribute must be an array.',
    'before' => 'The :attribute must be a date before :date.',
    'before_or_equal' => 'The :attribute must be a date before or equal to :date.',
    'between' => [
        'numeric' => 'The :attribute must be between :min and :max.',
        'file' => 'The :attribute must be between :min and :max kilobytes.',
        'string' => 'The :attribute must be between :min and :max characters.',
        'array' => 'The :attribute must have between :min and :max items.',
    ],
    'boolean' => 'The :attribute field must be true or false.',
    'confirmed' => 'The :attribute confirmation does not match.',
    'date' => 'The :attribute is not a valid date.',
    'date_equals' => 'The :attribute must be a date equal to :date.',
    'date_format' => 'The :attribute does not match the format :format.',
    'different' => 'The :attribute and :other must be different.',
    'digits' => 'The :attribute must be :digits digits.',
    'digits_between' => 'The :attribute must be between :min and :max digits.',
    'dimensions' => 'The :attribute has invalid image dimensions.',
    'distinct' => 'The :attribute field has a duplicate value.',
    'email' => 'The :attribute must be a valid email address.',
    'ends_with' => 'The :attribute must end with one of the following: :values.',
    'exists' => 'The selected :attribute is invalid.',
    'file' => 'The :attribute must be a file.',
    'filled' => 'The :attribute field must have a value.',
    'gt' => [
        'numeric' => 'The :attribute must be greater than :value.',
        'file' => 'The :attribute must be greater than :value kilobytes.',
        'string' => 'The :attribute must be greater than :value characters.',
        'array' => 'The :attribute must have more than :value items.',
    ],
    'gte' => [
        'numeric' => 'The :attribute must be greater than or equal :value.',
        'file' => 'The :attribute must be greater than or equal :value kilobytes.',
        'string' => 'The :attribute must be greater than or equal :value characters.',
        'array' => 'The :attribute must have :value items or more.',
    ],
    'image' => 'The :attribute must be an image.',
    'in' => 'The selected :attribute is invalid.',
    'in_array' => 'The :attribute field does not exist in :other.',
    'integer' => 'The :attribute must be an integer.',
    'ip' => 'The :attribute must be a valid IP address.',
    'ipv4' => 'The :attribute must be a valid IPv4 address.',
    'ipv6' => 'The :attribute must be a valid IPv6 address.',
    'json' => 'The :attribute must be a valid JSON string.',
    'lt' => [
        'numeric' => 'The :attribute must be less than :value.',
        'file' => 'The :attribute must be less than :value kilobytes.',
        'string' => 'The :attribute must be less than :value characters.',
        'array' => 'The :attribute must have less than :value items.',
    ],
    'lte' => [
        'numeric' => 'The :attribute must be less than or equal :value.',
        'file' => 'The :attribute must be less than or equal :value kilobytes.',
        'string' => 'The :attribute must be less than or equal :value characters.',
        'array' => 'The :attribute must not have more than :value items.',
    ],
    'max' => [
        'numeric' => 'The :attribute may not be greater than :max.',
        'file' => 'The :attribute may not be greater than :max kilobytes.',
        'string' => 'The :attribute may not be greater than :max characters.',
        'array' => 'The :attribute may not have more than :max items.',
    ],
    'mimes' => 'The :attribute must be a file of type: :values.',
    'mimetypes' => 'The :attribute must be a file of type: :values.',
    'min' => [
        'numeric' => 'The :attribute must be at least :min.',
        'file' => 'The :attribute must be at least :min kilobytes.',
        'string' => 'The :attribute must be at least :min characters.',
        'array' => 'The :attribute must have at least :min items.',
    ],
    'not_in' => 'The selected :attribute is invalid.',
    'not_regex' => 'The :attribute format is invalid.',
    'numeric' => 'The :attribute must be a number.',
    'password' => 'The password is incorrect.',
    'present' => 'The :attribute field must be present.',
    'regex' => 'The :attribute format is invalid.',
    'required' => 'The :attribute field is required.',
    'required_if' => 'The :attribute field is required when :other is :value.',
    'required_unless' => 'The :attribute field is required unless :other is in :values.',
    'required_with' => 'The :attribute field is required when :values is present.',
    'required_with_all' => 'The :attribute field is required when :values are present.',
    'required_without' => 'The :attribute field is required when :values is not present.',
    'required_without_all' => 'The :attribute field is required when none of :values are present.',
    'same' => 'The :attribute and :other must match.',
    'size' => [
        'numeric' => 'The :attribute must be :size.',
        'file' => 'The :attribute must be :size kilobytes.',
        'string' => 'The :attribute must be :size characters.',
        'array' => 'The :attribute must contain :size items.',
    ],
    'starts_with' => 'The :attribute must start with one of the following: :values.',
    'string' => 'The :attribute must be a string.',
    'timezone' => 'The :attribute must be a valid zone.',
    'unique' => 'The :attribute has already been taken.',
    'uploaded' => 'The :attribute failed to upload.',
    'url' => 'The :attribute format is invalid.',
    'uuid' => 'The :attribute must be a valid UUID.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'nombre' => [
            'required' => 'El nombre es requerido',
            'string' => 'El nombre tiene que ser un texto',
            'max:255' => 'El nombre es demasiado largo'
        ],
        'email' => [
            'required' => 'El email es requerido',
            'string' => 'El email tiene que ser un texto',
            'max:255' => 'El email es demasiado largo',
            'email' => 'Formato incorrecto',
            'unique' => 'El email ya existe'
        ],
        'Nombre' => [
            'required' => 'El nombre es requerido',
            'string' => 'El nombre tiene que ser un texto',
            'max' => 'El nombre es demasiado largo',
            'unique' => 'El nombre ya est?? registrado',
        ],
        'Autor' => [
            'required' => 'El autor es requerido',
            'string' => 'El autor tiene que ser un texto'
        ],
        'IdAutor' => [
            'required' => 'El autor debe estar registrado como un estudiante'
        ],
        'Anio' => [
            'required' => 'El a??o es requerido',
            'numeric' => 'El a??o tiene que ser un numero',
            'unique' => 'Ya hay un plan de estudios con este a??o'
        ],
        'Generacion' => [
            'required' => 'El n??mero de Generaci??n es requerido',
            'numeric' => 'La Generaci??n tiene que ser un numero',
            'unique' => 'Ya hay una Generaci??n con este n??mero',
            'max' => 'El nombre es demasiado largo'
        ],
        'Anio_Inicio' => [
            'required' => 'El a??o de inicio es requerido',
            'numeric' => 'El A??o tiene que ser un numero',
            'unique' => 'Ya hay una Generaci??n registrada con este a??o'
        ],
        'Apellido_P' => [
            'required' => 'El apellido paterno es requerido',
            'string' => 'El apellido paterno tiene que ser un texto',
            'max' => 'El apellido paterno es demasiado largo',
        ],
        'Apellido_M' => [
            'required' => 'El apellido materno es requerido',
            'string' => 'El apellido materno tiene que ser un texto',
            'max' => 'El apellido materno es demasiado largo',
        ],
        'Correo' => [
            'required' => 'El correo es requerido',
            'string' => 'El correo tiene que ser un texto',
            'max' => 'El correo es demasiado largo',
            'email' => 'Formato de correo incorrecto',
            'unique' => 'El correo ya existe'
        ],
        'CorreoPersonal' => [
            'string' => 'El correo tiene que ser un texto',
            'max' => 'El correo es demasiado largo',
            'email' => 'Formato de correo incorrecto',
            'unique' => 'El correo ya existe'
        ],
        'No_CVU' => [
            'required' => 'El n??mero de CVU es requerido',
            'numeric' => 'El CVU tiene que ser numerico',
            'digits_between' => "El n??mero de CVU debe tener entre 5 y 6 digitos",
            'unique' => 'El n??mero de CVU ya existe'
        ],
        'Matricula' => [
            'required' => 'La matr??cula es requerida',
            'string' => 'El CVU tiene que ser una cadena',
            'size' => "La matr??cula debe tener 9 car??cteres",
            'unique' => 'Esta matr??cula ya existe'
        ],
        'Institucion' => [
            'required' => 'El nombre de la instituci??n es requerido',
            'string' => 'El nombre de la instituci??n tiene que ser un texto',
            'max' => 'El nombre de la instituci??n es demasiado largo'
        ],
        'Pais' => [
            'required' => 'El pa??s es requerido',
            'string' => 'El nombre del pa??s tiene que ser un texto',
            'max' => 'El nombre del pa??s es demasiado largo'
        ],
        'Id_LGAC' => [
            'required' => 'Debe seleccionar al menos una LGAC'
        ],
        'Titulo' => [
            'required' => 'El t??tulo es requerido',
            'string' => 'El t??tulo tiene que ser un texto',
            'max' => 'El t??tulo es demasiado largo'
        ],
        'Universidad' => [
            'required' => 'El nombre de la universidad es requerido',
            'string' => 'El nombre de la universidad tiene que ser un texto',
            'max' => 'El nombre de la universidad es demasiado largo'
        ],
        'Lugar' => [
            'required' => 'El lugar es requerido',
            'string' => 'El lugar tiene que ser un texto',
            'max' => 'El lugar es demasiado largo'
        ],
        'Ciudad' => [
            'required' => 'La ciudad es requerido',
            'string' => 'La ciudad tiene que ser un texto',
            'max' => 'La ciudad es demasiado largo'
        ],
        'Archivo' => [
            'required' => 'El archivo evidencia es requerido'
        ],
        'OpcionOtro' => [
            'required_if' => 'Es necesario definir un tipo de documento'
        ],
        'ArchivoCartaLib' => [
            'required_if' => 'Si el estado es Egresado, es necesario cargar la carta de liberaci??n'
        ],
        'MesPublicacion' => [
            'required_if' => 'Debe seleccionar el mes'
        ],
        'AnioPublicacion' => [
            'required_if' => 'Debe seleccionar el a??o'
        ],
        'ArchivoTesis' => [
            'required_if' => 'Es necesario cargar el archivo de tesis'
        ],
        'ArchivoActaDeExamen' => [
            'required_if' => 'Es necesario cargar el acta de examen'
        ],
        'DireccionRepositorio' => [
            'required_if' => 'Es necesario registrar la direcci??n del repositorio',
            'url' => 'La direcci??n URL debe ser valida',
            'max' => 'La direcci??n URL es demasiado larga'
        ],
        'DireccionDocumento' => [
            'required_if' => 'Es necesario registrar la direcci??n del documento en el repositorio',
            'url' => 'La direcci??n URL debe ser valida',
            'max' => 'La direcci??n URL es demasiado larga'
        ],
        'Periodo' => [
            'required' => 'El periodo es requerido',
            'string' => 'El periodo tiene que ser un texto',
            'max' => 'El periodo excede el maximo de caracteres'
        ],
        'Descripcion' => [
            'required' => 'La descripci??n es requerida',
            'string' => 'La descripcion tiene que ser un texto',
            'max' => 'La descripcion excede el maximo de caracteres'
        ],
        'Nombre_Organizacion' => [
            'required' => 'El nombre de la organizacion es requerido',
            'string' => 'El nombre de la organizacion tiene que ser un texto',
            'max' => 'El nombre de la organizacion es demasiado largo'
        ],
        'Director' => [
            'required' => 'Es necesario definir al Director',
            'different' => 'El profesor no puede asignarse a m??s de un tipo de colaboraci??n'
        ],
        'IdDirector' => [
            'required' => 'El profesor debe estar registrado en la base de datos'
        ],
        'ArchivoEvDirector' => [
            'required_if' => 'La evidencia de evaluaci??n es requerida'
        ],
        'Codirector' => [
            'different' => 'El profesor no puede asignarse a m??s de un tipo de colaboraci??n',
            'required_with' => 'El Codirector es requerido si se carga su evaluaci??n'
        ],
        'IdCodirector' => [
            'required_with' => 'El profesor debe estar registrado en la base de datos'
        ],
        'ArchivoEvCodirector' => [
            'required_with' => 'La evidencia de evaluaci??n es requerida'
        ],
        'JuradoP' => [
            'required_if' => 'Es necesario definir al Jurado Presidente',
            'different' => 'El profesor no puede asignarse a m??s de un tipo de colaboraci??n'
        ],
        'IdJuradoP' => [
            'required_if' => 'El profesor debe estar registrado en la base de datos'
        ],
        'ArchivoEvJuradoP' => [
            'required_if' => 'La evidencia de evaluaci??n es requerida'
        ],
        'JuradoS' => [
            'required_if' => 'Es necesario definir al Jurado Secretario',
            'different' => 'El profesor no puede asignarse a m??s de un tipo de colaboraci??n'
        ],
        'IdJuradoS' => [
            'required_if' => 'El profesor debe estar registrado en la base de datos'
        ],
        'ArchivoEvJuradoS' => [
            'required_if' => 'La evidencia de evaluaci??n es requerida'
        ],
        'JuradoV' => [
            'required_if' => 'Es necesario definir al Jurado Vocal',
            'different' => 'El profesor no puede asignarse a m??s de un tipo de colaboraci??n'
        ],
        'IdJuradoV' => [
            'required_if' => 'El profesor debe estar registrado en la base de datos'
        ],
        'ArchivoEvJuradoV' => [
            'required_if' => 'La evidencia de evaluaci??n es requerida'
        ],
        'FechaComienzo' => [
            'required' => 'La fecha de comienzo es requerida',
            'before' => 'La fecha de comienzo debe ser anterior a la fecha de conclusi??n'
        ],
        'FechaConclusion' => [
            'after' => 'La fecha de conclusi??n debe ser posterior a la fecha de comienzo'
        ],
        'NombreCongreso' => [
            'required_if' => 'El nombre del congreso es requerido',
            'string' => 'El nombre tiene que ser un texto',
            'max' => 'El nombre excede el maximo de caracteres'
        ],
        'Acronimo' => [
            'required_if' => 'El acr??nimo del congreso es requerido',
            'string' => 'El acr??nimo tiene que ser un texto',
            'max' => 'El acr??nimo excede el maximo de caracteres'
        ],
        'Dependencia' => [
            'required_if' => 'La dependencia es requerida',
            'string' => 'La dependencia tiene que ser un texto',
            'max' => 'La dependencia excede el maximo de caracteres'
        ],
        'NombreConvenio' => [
            'required' => 'Es necesario el nombre clave del convenio',
            'max' => 'La nombre clave excede el maximo de caracteres',
            'string' => 'El nombre clave tiene que ser un texto'
        ],
        'IdConvenio' => [
            'required' => 'El convenio debe estar registrado en la base de datos'
        ],
        'NombreEstudiante' => [
            'required' => 'Es necesario el nombre del estudiante',
            'string' => 'El nombre del estudiante que ser un texto'
        ],
        'IdEstudiante' => [
            'required' => 'El estudiante debe estar registrado en la base de datos'
        ],
        'InstitucionDestino' => [
            'required' => 'Es necesario el nombre de la Instituci??n destino',
            'string' => 'El nombre de la Instituci??n debe ser un texto',
            'max' => 'El nombre de la Instituci??n excede el maximo de caracteres'
        ],
        'InstitucionOrigen' => [
            'required_if' => 'Es necesario el nombre de la Instituci??n origen',
            'string' => 'El nombre de la Instituci??n debe ser un texto',
            'max' => 'El nombre de la Instituci??n excede el maximo de caracteres'
        ],
        'ProgramaDestino' => [
            'required_if' => 'Es necesario el programa educativo destino',
            'string' => 'El programa educativo destino debe ser un texto',
            'max' => 'El programa educativo excede el maximo de caracteres'
        ],
        'ProgramaOrigen' => [
            'required_if' => 'Es necesario el programa educativo de origen',
            'string' => 'El programa educativo destino debe ser un texto',
            'max' => 'El programa educativo excede el maximo de caracteres'
        ],
        'Motivo' => [
            'required' => 'Es necesario escribir el motivo de la movilidad',
            'string' => 'El motivo debe ser un texto',
            'max' => 'El motivo de la movilidad excede el maximo de caracteres'
        ],
        'PeriodoComienzo' => [
            'required' => 'Es necesario definir el periodo de comienzo',
            'before_or_equal' => 'El periodo de comienzo debe ser previo al periodo de conclusi??n'
        ],
        'PeriodoConclusion' => [
            'required' => 'Es necesario definir el periodo de conclusi??n',
            'after_or_equal' => 'El periodo de conclusi??n debe ser posterior al periodo de comienzo'
        ],
        'DependenciaDestino' => [
            'string' => 'El programa educativo destino debe ser un texto',
            'max' => 'El programa educativo excede el maximo de caracteres'
        ],
        'DependenciaOrigen' => [
            'string' => 'El programa educativo destino debe ser un texto',
            'max' => 'El programa educativo excede el maximo de caracteres'
        ],
        'NombreProyecto' => [
            'required' => 'Es necesario el nombre del proyecto',
            'string' => 'El nombre del proyecto debe ser un texto',
            'max' => 'El nombre del proyecto excede el maximo de caracteres'
        ],
        'Institucion' => [
            'required' => 'Es necesario el nombre de la instituci??n',
            'string' => 'El nombre de la instituci??n debe ser un texto',
            'max' => 'El nombre de la instituci??n excede el maximo de caracteres'
        ],
        'ResponsableProyecto' => [
            'required' => 'Es necesario el nombre del responsable del proyecto',
            'string' => 'El nombre del responsable debe ser un texto',
            'max' => 'El nombre del responsable excede el maximo de caracteres'
        ],
        'ProfesorResponsable' => [
            'required' => 'Es necesario el nombre del profesor responsable'
        ],
        'IdProfesorResponsable' => [
            'required' => 'El profesor responsable debe estar registrado en la base de datos'
        ],
        'ColabProf' => [
            'required' => 'Es necesario el nombre del profesor colaborador'
        ],
        'IdColabProf' => [
            'required' => 'El profesor debe estar registrado en la base de datos'
        ],
        'ColabEst' => [
            'required' => 'Es necesario el nombre del estudiante colaborador'
        ],
        'IdColabEst' => [
            'required' => 'El estudiante debe estar registrado en la base de datos'
        ],
        'AnioInicio' => [
            'before_or_equal' => 'El a??o de inicio debe ser previo al a??o de conclusi??n'
        ],
        'AnioFin' => [
            'after_or_equal' => 'El a??o de conclusi??n debe ser posterior al a??o de inicio'
        ],
        'NombreEE' => [
            'required' => 'Es necesario el nombre de la experiencia educativa',
            'string' => 'El nombre de la experiencia educativa debe ser un texto',
            'max' => 'El nombre de la experiencia educativa excede el maximo de caracteres'
        ],
        'CreditosEE' => [
            'required' => 'Es necesario introducir el n??mero de cr??ditos'
        ],
        'TeoriaConProfesorEE' => [
            'required' => 'Es necesario introducir las horas dedicadas'
        ],
        'TeoriaSinProfesorEE' => [
            'required' => 'Es necesario introducir las horas dedicadas'
        ],
        'PracticasConProfesorEE' => [
            'required' => 'Es necesario introducir las horas dedicadas'
        ],
        'PracticasSinProfesorEE' => [
            'required' => 'Es necesario introducir las horas dedicadas'
        ],
        'EE' => [
            'required' => 'La experiencia educativa es requerida'
        ],
        'IdEE' => [
            'required' => 'La experiencia educativa debe estar registrada en la base de datos'
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
