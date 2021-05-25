<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profesores extends Model
{
    protected $fillable = [
        'id',
        'No_CVU',
        'Nombre',
        'Apellido_P',
        'Apellido_M',
        'Correo',
        'CorreoPersonal',
        'Tipo_Contratacion',
        'Institucion',
        'Mes_Ingreso',
        'Anio_Ingreso',
        'Mes_Salida',
        'Anio_Salida',
        'Tipo_Colaboracion',
        'Fecha_Ingreso_NAB',
        'Estado',
        'Pais'
    ];

    public function MostrarProfesores(){
        $profesores = Profesores::join('tipos_contrataciones', 'profesores.Tipo_Contratacion', '=', 'tipos_contrataciones.id')
                        ->select('profesores.id', 'profesores.No_CVU', 'profesores.Nombre', 'profesores.Apellido_P', 'profesores.Apellido_M', 'profesores.Correo', 'tipos_contrataciones.Tipo', 'profesores.Mes_Ingreso', 'profesores.Anio_Ingreso')
                        ->where('Estado', '=', 'Habilitado')
                        ->orderBy('Apellido_P', 'DESC')->get();
        return $profesores;
    }

    public function RegistrarDatosGenerales($request){
        $estado = $request->get('Estado');
        if($estado!="on"){
            $estado = "Deshabilitado";
        }else{
            $estado = "Habilitado";
        }
        $datos = new Profesores ([
            'No_CVU'=> $request->get('No_CVU'),
            'Nombre'=> $request->get('Nombre'),
            'Apellido_P'=> $request->get('Apellido_P'),
            'Apellido_M'=> $request->get('Apellido_M'),
            'Correo'=> $request->get('Correo'),
            'CorreoPersonal'=> $request->get('CorreoPersonal'),
            'Tipo_Contratacion'=> $request->get('Tipo_Contratacion'),
            'Institucion'=> $request->get('Institucion'),
            'Mes_Ingreso'=> $request->get('Mes_Ingreso'),
            'Anio_Ingreso'=> $request->get('Anio_Ingreso'),
            'Mes_Salida'=> $request->get('Mes_Salida'),
            'Anio_Salida'=> $request->get('Anio_Salida'),
            'Tipo_Colaboracion'=> $request->get('Tipo_Colaboracion'),
            'Fecha_Ingreso_NAB'=> $request->get('Fecha_Ingreso_NAB'),
            'Estado' => $estado,
            'Pais'=> $request->get('Pais')
        ]); 
        $datos->save();
        return $datos->id;
    }

    public function ObtenerNombreProfesor($id){
        $profesor = Profesores::select('Nombre', 'Apellido_P', 'Apellido_M')->where('id', '=', $id)->get();
        return $profesor;
    }

    public function busquedaProfesor($request){
        $opcion = $request->opcionBusqueda;
        $text = $request->textBusqueda;
        if($text != ""){
            if($opcion == "No_CVU"){
                $profesor = Profesores::join('tipos_contrataciones', 'profesores.Tipo_Contratacion', '=', 'tipos_contrataciones.id')
                ->select('profesores.id', 'profesores.No_CVU', 'profesores.Nombre', 'profesores.Apellido_P', 'profesores.Apellido_M', 'profesores.Correo', 'tipos_contrataciones.Tipo', 'profesores.Mes_Ingreso', 'profesores.Anio_Ingreso')
                ->where([[$opcion, 'like', '%'.$text.'%'], ['Estado', '=', 'Habilitado']])
                ->orderBy('Apellido_P', 'DESC')->get();
            }else{
                $profesor = Profesores::join('tipos_contrataciones', 'profesores.Tipo_Contratacion', '=', 'tipos_contrataciones.id')
                ->select('profesores.id', 'profesores.No_CVU', 'profesores.Nombre', 'profesores.Apellido_P', 'profesores.Apellido_M', 'profesores.Correo', 'tipos_contrataciones.Tipo', 'profesores.Mes_Ingreso', 'profesores.Anio_Ingreso')
                ->where([['Nombre', 'like', '%'.$text.'%'], ['Estado', '=', 'Habilitado']])
                ->orWhere([['Apellido_P', 'like', '%'.$text.'%'], ['Estado', '=', 'Habilitado']])
                ->orWhere([['Apellido_M', 'like', '%'.$text.'%'], ['Estado', '=', 'Habilitado']])
                ->orderBy('Apellido_P', 'DESC')->get();
            }
        }else{
            $profesor = Profesores::join('tipos_contrataciones', 'profesores.Tipo_Contratacion', '=', 'tipos_contrataciones.id')
                ->select('profesores.id', 'profesores.No_CVU', 'profesores.Nombre', 'profesores.Apellido_P', 'profesores.Apellido_M', 'profesores.Correo', 'tipos_contrataciones.Tipo', 'profesores.Mes_Ingreso', 'profesores.Anio_Ingreso')
                ->where('Estado', '=', 'Habilitado')
                ->orderBy('Apellido_P', 'DESC')->get();
        }
            
        return $profesor;
    }
    
    public function FiltradoProfesor($request){
        $mostrar = $request->get('mostrar');
        
        switch ($mostrar) {
            case 'Todos':
                $profesores = Profesores::join('tipos_contrataciones', 'profesores.Tipo_Contratacion', '=', 'tipos_contrataciones.id')
                ->select('profesores.id', 'profesores.No_CVU', 'profesores.Nombre', 'profesores.Apellido_P', 'profesores.Apellido_M', 'profesores.Correo', 'tipos_contrataciones.Tipo', 'profesores.Mes_Ingreso', 'profesores.Anio_Ingreso')
                ->where('Estado', '=', 'Habilitado')
                ->orderBy('Apellido_P', 'DESC')->get();
                break;
            default:
                $profesores = Profesores::join('tipos_contrataciones', 'profesores.Tipo_Contratacion', '=', 'tipos_contrataciones.id')
                ->select('profesores.id', 'profesores.No_CVU', 'profesores.Nombre', 'profesores.Apellido_P', 'profesores.Apellido_M', 'profesores.Correo', 'tipos_contrataciones.Tipo', 'profesores.Mes_Ingreso', 'profesores.Anio_Ingreso')
                ->where([['Tipo_Contratacion', '=', $mostrar], ['Estado', '=', 'Habilitado']])->get();
                break;
        }
        return $profesores;
    }

    public function DeshabilitarProfesor($request){
        $Profesor = Profesores::find($request->get('idProfe'));
        $Profesor->Estado = "Deshabilitado";
        $Profesor->save();
        return "El profesor ha sido deshabilitado";
    }

    public function ObtenerDatosGeneralesProfesor($request){
        $idProfesor = $request->get('idProfe');
        $Profesor = Profesores::join('tipos_contrataciones', 'profesores.Tipo_Contratacion', '=', 'tipos_contrataciones.id')
            ->join('tipos_colaboraciones', 'profesores.Tipo_Colaboracion', '=', 'tipos_colaboraciones.id')
            ->join('paises', 'profesores.Pais', '=', 'paises.id')
            ->select('profesores.id', 'Nombre', 'Apellido_P', 'Apellido_M', 'No_CVU', 'Correo', 'CorreoPersonal', 'tipos_contrataciones.Tipo as TipoContratacion', 'Institucion', 'Mes_Ingreso', 'Anio_Ingreso', 'Mes_Salida', 'Anio_Salida', 'tipos_colaboraciones.Tipo as TipoColaboracion', 'Fecha_Ingreso_NAB', 'paises.Pais')
            ->where('profesores.id', '=', $idProfesor)->get();
        return $Profesor;
    }
    
    public function ModificarDatosGenerales($request, $id){
        $estado = $request->get('Estado');
        if($estado!="on"){
            $estado = "Deshabilitado";
        }else{
            $estado = "Habilitado";
        }

        $profesor = Profesores::find($id);
        $profesor->No_CVU = $request->get('No_CVU');
        $profesor->Nombre = $request->get('Nombre');
        $profesor->Apellido_P = $request->get('Apellido_P');
        $profesor->Apellido_M = $request->get('Apellido_M');
        $profesor->Correo = $request->get('Correo');
        $profesor->CorreoPersonal = $request->get('CorreoPersonal');
        $profesor->Tipo_Contratacion = $request->get('Tipo_Contratacion');
        $profesor->Institucion = $request->get('Institucion');
        $profesor->Mes_Ingreso = $request->get('Mes_Ingreso');
        $profesor->Anio_Ingreso = $request->get('Anio_Ingreso');
        $profesor->Mes_Salida = $request->get('Mes_Salida');
        $profesor->Anio_Salida = $request->get('Anio_Salida');
        $profesor->Tipo_Colaboracion = $request->get('Tipo_Colaboracion');
        $profesor->Fecha_Ingreso_NAB = $request->get('Fecha_Ingreso_NAB');
        $profesor->Estado = $estado;
        $profesor->Pais = $request->get('Pais');
        
        $profesor->save();
    }
}
