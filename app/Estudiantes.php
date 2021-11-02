<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Estudiantes extends Model
{
    protected $fillable = [
        'id',
        'No_CVU',
        'Id_Generacion',
        'Id_Plan',
        'Id_LGAC',
        'Matricula',
        'Nombre',
        'Apellido_P',
        'Apellido_M',
        'Correo',
        'CorreoPersonal',
        'Estado',
        'NombreCarta',
        'Ruta_Carta'
    ];

    public function MostrarEstudiantes(){
        $estudiante = Estudiantes::join('generaciones', 'estudiantes.Id_Generacion', '=', 'generaciones.id')
                        ->select('estudiantes.id', 'No_CVU', 'Matricula', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'estudiantes.Correo', 'estudiantes.Estado', 'Generacion')
                        ->orderBy('Apellido_P', 'DESC')->get();
        return $estudiante;
    }

    public function FiltradoEstudiante($request){
        $mostrar = $request->get('mostrar');
        
        switch ($mostrar) {
            case 'Todos':
                $estudiantes = Estudiantes::join('generaciones', 'estudiantes.Id_Generacion', '=', 'generaciones.id')
                ->select('estudiantes.id', 'estudiantes.No_CVU', 'estudiantes.Matricula', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'estudiantes.Correo', 'generaciones.Generacion', 'estudiantes.Estado')
                ->orderBy('Apellido_P', 'DESC')->get();
                break;
            default:
                $estudiantes = Estudiantes::join('generaciones', 'estudiantes.Id_Generacion', '=', 'generaciones.id')
                ->select('estudiantes.id', 'estudiantes.No_CVU', 'estudiantes.Matricula', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'estudiantes.Correo', 'generaciones.Generacion', 'estudiantes.Estado')
                ->where('estudiantes.Estado', '=', $mostrar)->get();
                break;
        }
        return $estudiantes;
    }

    public function BusquedaEstudiante($request){
        $opcion = $request->opcionBusqueda;
        $text = $request->textBusqueda;
        if($text != ""){


            if($opcion != "Nombre"){
                $estudiantes = Estudiantes::join('generaciones', 'estudiantes.Id_Generacion', '=', 'generaciones.id')
                ->select('estudiantes.id', 'estudiantes.No_CVU', 'estudiantes.Matricula', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'estudiantes.Correo', 'generaciones.Generacion', 'estudiantes.Estado')
                ->where($opcion, 'like', '%'.$text.'%')
                ->orderBy('Apellido_P', 'DESC')->get();
            }else{
                $estudiantes = Estudiantes::join('generaciones', 'estudiantes.Id_Generacion', '=', 'generaciones.id')
                ->select('estudiantes.id', 'estudiantes.No_CVU', 'estudiantes.Matricula', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'estudiantes.Correo', 'generaciones.Generacion', 'estudiantes.Estado')
                ->where('Nombre', 'like', '%'.$text.'%')
                ->orWhere('Apellido_P', 'like', '%'.$text.'%')
                ->orWhere('Apellido_M', 'like', '%'.$text.'%')
                ->orderBy('Apellido_P', 'DESC')->get();
            }
        }else{
            $estudiantes = Estudiantes::join('generaciones', 'estudiantes.Id_Generacion', '=', 'generaciones.id')
            ->select('estudiantes.id', 'estudiantes.No_CVU', 'estudiantes.Matricula', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'estudiantes.Correo', 'generaciones.Generacion', 'estudiantes.Estado')
            ->orderBy('Apellido_P', 'DESC')->get();
        }
            
        return $estudiantes;
    }

    public function ObtenerEstudiantes(){
        $estudiantes = Estudiantes::select('Nombre', 'Apellido_P', 'Apellido_M', 'id')->get();
        return $estudiantes;
    }

    public function getEstudiante($request){
        $estudiante = Estudiantes::join('generaciones', 'estudiantes.Id_Generacion', '=', 'generaciones.id')
                ->join('l_g_a_c_s', 'estudiantes.Id_LGAC', '=', 'l_g_a_c_s.id')
                ->select('estudiantes.Id_LGAC', 'l_g_a_c_s.Nombre as NombreLGAC', 'estudiantes.Id_Generacion', 'generaciones.Generacion as NombreGen')
                ->where('estudiantes.id', '=', $request->get('idEstudiante'))
                ->get();
        
        return $estudiante;
    }

    public function RegistrarDatosGenerales($request){
        $estado = $request->get('Estado');
        $NombreCarta = null;
        $RutaArchivo = null;

        $datos = new Estudiantes ([
            'No_CVU'=> $request->get('No_CVU'),
            'Id_Generacion'=> $request->get('Generacion'),
            'Id_Plan'=> $request->get('Id_Plan'),
            'Id_LGAC'=> $request->get('Id_LGAC'),
            'Matricula'=> $request->get('Matricula'),
            'Nombre'=> $request->get('Nombre'),
            'Apellido_P'=> $request->get('Apellido_P'),
            'Apellido_M'=> $request->get('Apellido_M'),
            'Correo'=> $request->get('Correo'),
            'CorreoPersonal'=> $request->get('CorreoPersonal'),
            'Estado'=> $estado
        ]); 
        $datos->save();

        $idEstudiante = $datos->id;
        
        if($estado=="Egresado"){
            $archivo = $request->file('ArchivoCartaLib');
            $inicialesEstudiante = "";
            $aux2=explode(" ", $request->get('Nombre'));
            for ($i=0; $i < count($aux2) ; $i++) { 
                $inicialesEstudiante = $inicialesEstudiante . substr($aux2[$i], 0, 1);
            }
            $inicialesEstudiante = $inicialesEstudiante . substr($request->get('Apellido_P'), 0, 1);
            $inicialesEstudiante = $inicialesEstudiante . substr($request->get('Apellido_M'), 0, 1);

            try {
                mkdir(public_path().'/storage/Documentos/Estudiantes/CartasLiberacion/'.$idEstudiante.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $extension = $archivo->getClientOriginalExtension();
            $fileName = $inicialesEstudiante."-CARTA-LIBERACION.".$extension;
            $tmpPath = $archivo;
            $newPath = public_path().'/storage/Documentos/Estudiantes/CartasLiberacion/'.$idEstudiante.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $Estudiante = Estudiantes::find($idEstudiante);
            $Estudiante->Ruta_Carta = '/storage/Documentos/Estudiantes/CartasLiberacion/'.$idEstudiante.'/'.$fileName;
            $Estudiante->NombreCarta = $fileName;
            
            $Estudiante->save();
        }

        return $idEstudiante;
    }

    public function ObtenerNombreEstudiante($id){
        $Estudiante = Estudiantes::select('Nombre', 'Apellido_P', 'Apellido_M')->where('id', '=', $id)->get();
        return $Estudiante;
    }

    public function ObtenerDatosGeneralesEstudiante($request){
        $idEstudiante = $request->get('idEstudiante');
        $Estudiante = Estudiantes::join('generaciones', 'estudiantes.Id_Generacion', '=', 'generaciones.id')
            ->join('plan_estudios', 'estudiantes.Id_Plan', '=', 'plan_estudios.id')
            ->join('l_g_a_c_s', 'estudiantes.Id_LGAC', '=', 'l_g_a_c_s.id')
            ->select('estudiantes.id', 'No_CVU', 'generaciones.Generacion', 'Id_Generacion', 'Id_LGAC', 'estudiantes.Id_Plan', 'plan_estudios.Nombre as PlanEstudios', 'l_g_a_c_s.Nombre as LGAC', 'Matricula', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'Correo', 'CorreoPersonal', 'estudiantes.Estado', 'NombreCarta', 'Ruta_Carta')
            ->where('estudiantes.id', '=', $idEstudiante)->get();
        return $Estudiante;
    }

    public function ModificarEstudiante($request, $id){
        $archivo = $request->file('ArchivoCartaLib');

        $Estudiante = Estudiantes::find($id);

        $Estudiante->No_CVU = $request->get('No_CVU');
        $Estudiante->Id_Generacion = $request->get('Generacion');
        $Estudiante->Id_Plan = $request->get('Id_Plan');
        $Estudiante->Id_LGAC = $request->get('Id_LGAC');
        $Estudiante->Matricula = $request->get('Matricula');
        $Estudiante->Nombre = $request->get('Nombre');
        $Estudiante->Apellido_P = $request->get('Apellido_P');
        $Estudiante->Apellido_M = $request->get('Apellido_M');
        $Estudiante->Correo = $request->get('Correo');
        $Estudiante->CorreoPersonal = $request->get('CorreoPersonal');
        $Estudiante->Estado = $request->get('Estado');

        $inicialesEstudiante = "";
        $aux2=explode(" ", $request->get('Nombre'));
        for ($i=0; $i < count($aux2) ; $i++) { 
            $inicialesEstudiante = $inicialesEstudiante . substr($aux2[$i], 0, 1);
        }
        $inicialesEstudiante = $inicialesEstudiante . substr($request->get('Apellido_P'), 0, 1);
        $inicialesEstudiante = $inicialesEstudiante . substr($request->get('Apellido_M'), 0, 1);

        $filename="";
        if($request->get('Estado')=="Egresado"){

            if($archivo!=null){
                if($Estudiante->Ruta_Carta!=null){
                    try {
                        $file = glob(public_path().$Estudiante->Ruta_Carta);
                        unlink($file[0]);
                    }catch(\Throwable $th){} 
                }
                $extension = $archivo->getClientOriginalExtension();
                $fileName = $inicialesEstudiante."-CARTA-LIBERACION".$extension;
                $tmpPath = $archivo;
                $newPath = public_path().'/storage/Documentos/Estudiantes/CartasLiberacion/'.$id.'/'.$fileName;
                move_uploaded_file($tmpPath,$newPath);
            }else{
                if($Estudiante->Ruta_Carta!=null){
                    $extension = "pdf";
                    $fileName = $inicialesEstudiante."-CARTA-LIBERACION".$extension;
                    $newPath = public_path().'/storage/Documentos/Estudiantes/CartasLiberacion/'.$id.'/'.$fileName;
                    rename(public_path().$Estudiante->Ruta_Carta,$newPath);
                }
            }

            $Estudiante->Ruta_Carta = '/storage/Documentos/Estudiantes/CartasLiberacion/'.$id.'/'.$fileName;
            $Estudiante->NombreCarta = $fileName;
        }
        $Estudiante->save();
        return "Cambios DG hechos";
    }
}
