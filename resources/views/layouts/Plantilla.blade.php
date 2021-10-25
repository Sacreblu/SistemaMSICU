<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/png" href="{{asset('storage/Imagenes/msicu.png')}}">
    <link rel="shortcut icon" sizes="192x192" href="{{asset('storage/Imagenes/msicu.png')}}">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>MSICU</title>
    <script src="{{asset('js/libs/jquery3.5.1.js')}}" ></script>
    <script src="{{asset('js/libs/bootstrap4.0.js')}}"></script>
    <script src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="{{asset('css/libs/bootstrap4.0.css')}}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.23/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="{{asset('css/header.css')}}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
    

</head>
<body>
    <div class="head">
        <div class="header">
            <img class="imagen-header" src="{{asset('storage/Imagenes/msicu.png')}}" alt="" width="70" heigth="40">
            <img class="imagen-header img-right" src="{{asset('storage/Imagenes/uv.png')}}" alt="" width="60" heigth="60" >
            <img class="imagen-header img-right" src="{{asset('storage/Imagenes/fei.png')}}" alt="" width="40" heigth="40">
        </div>
    
        <nav class="navbar navbar-expand-lg navbar-light bg-light menu">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/Trabajos_Recepcionales') }}">Trabajos Recepcionales</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Productos LGAC</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/Profesores') }}">Profesores</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/Estudiantes') }}">Estudiantes</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Movilidad
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="{{ url('/Convenios_Movilidad') }}">Convenios de Movilidad y Congresos</a>
                            <a class="dropdown-item" href="{{ url('/Acciones_Movilidad') }}">Movilidad y Congresos</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Trabajo en Sector</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/Plan_de_Estudios') }}">Plan de Estudios</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</body>
</html>