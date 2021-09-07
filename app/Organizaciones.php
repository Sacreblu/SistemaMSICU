<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Organizaciones extends Model
{
    protected $fillable = [
        'id',
        'Id_Profesor',
        'Nombre_Organizacion',
        'Anio',
        'Periodo',
        'Descripcion',
        'Ruta_Archivo',
        'NombreArchivo'
    ];

    public function RegistrarPertenencia($request){
        $archivo = $request->file('Archivo');
        $anio = $request->get('Anio');
        $periodo = $request->get('Periodo');
        $organizacion = $request->get('Nombre_Organizacion');
        
        $profesor = new Profesores();
        $profesor = $profesor->ObtenerNombreProfesor($request->get('idProfesor'));
        $inicialesProf = "";
        $aux2=explode(" ", $profesor[0]->Nombre);
        for ($i=0; $i < count($aux2) ; $i++) { 
            $inicialesProf = $inicialesProf . substr($aux2[$i], 0, 1);
        }
        $inicialesProf = $inicialesProf . substr($profesor[0]->Apellido_P, 0, 1);
        $inicialesProf = $inicialesProf . substr($profesor[0]->Apellido_M, 0, 1);
        
        try {
            mkdir(public_path().'/storage/Documentos/Profesores/Pertenencias/'.$request->get('idProfesor').'/', 0700);
        } catch (\Throwable $th) {
            //throw $th;
        }
        
        $extension = $archivo->getClientOriginalExtension();
        $fileName = $inicialesProf."-".$organizacion."-".$periodo.'-'.$anio.'.'.$extension;
        $tmpPath = $archivo;
        $newPath = public_path().'/storage/Documentos/Profesores/Pertenencias/'.$request->get('idProfesor').'/'.$fileName;
        move_uploaded_file($tmpPath,$newPath);

        $datos = new Organizaciones ([
            'Id_Profesor'=> $request->get('idProfesor'),
            'Nombre_Organizacion'=> $organizacion,
            'Periodo'=> $periodo,
            'Anio'=> $anio,
            'Descripcion'=> $request->get('Descripcion'),
            'Ruta_Archivo'=> '/storage/Documentos/Profesores/Pertenencias/'.$request->get('idProfesor').'/'.$fileName,
            'NombreArchivo'=> $fileName
        ]); 
        $datos->save();

        return "hecho";
    }
    
    public function ModificarPertenencia($request){
        $archivo = $request->file('Archivo');
        $anio = $request->get('Anio');
        $periodo = $request->get('Periodo');
        $organizacion = $request->get('Nombre_Organizacion');
        
        $idRegistro = $request->get('IdRegistro');

        $Pertenencia = Organizaciones::find($idRegistro);

        $profesor = new Profesores();
        $profesor = $profesor->ObtenerNombreProfesor($request->get('idProfesor'));
        $inicialesProf = "";
        $aux2=explode(" ", $profesor[0]->Nombre);
        for ($i=0; $i < count($aux2) ; $i++) { 
            $inicialesProf = $inicialesProf . substr($aux2[$i], 0, 1);
        }
        $inicialesProf = $inicialesProf . substr($profesor[0]->Apellido_P, 0, 1);
        $inicialesProf = $inicialesProf . substr($profesor[0]->Apellido_M, 0, 1);
        
        $filename="";
        if($archivo!=null){
            try {
                $file = glob(public_path().$Pertenencia->Ruta_Archivo);
                unlink($file[0]);
            }catch(\Throwable $th){} 

            $extension = $archivo->getClientOriginalExtension();
            $fileName = $inicialesProf."-".$organizacion."-".$periodo.'-'.$anio.'.'.$extension;
            $tmpPath = $archivo;
            $newPath = public_path().'/storage/Documentos/Profesores/Pertenencias/'.$request->get('idProfesor').'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);
        }else{
            $extension = "pdf";
            $fileName = $inicialesProf."-".$organizacion."-".$periodo.'-'.$anio.'.'.$extension;
            $newPath = public_path().'/storage/Documentos/Profesores/Pertenencias/'.$request->get('idProfesor').'/'.$fileName;
            rename(public_path().$Pertenencia->Ruta_Archivo,$newPath);
        }

        $Pertenencia->Nombre_Organizacion = $organizacion;
        $Pertenencia->Id_Profesor = $request->get('idProfesor');
        $Pertenencia->Anio = $request->get('Anio');
        $Pertenencia->Periodo = $request->get('Periodo');
        $Pertenencia->Descripcion = $request->get('Descripcion');
        $Pertenencia->Ruta_Archivo = '/storage/Documentos/Profesores/Pertenencias/'.$request->get('idProfesor').'/'.$fileName;
        $Pertenencia->NombreArchivo = $fileName;
        
        $Pertenencia->save();

        return "cambios hechos org";
    }

    public function EliminarPertenencia($request){
        $ids = $request->get('Ids');
        for ($i=0; $i < count($ids); $i++) { 
            $Organizacion = Organizaciones::find($ids[$i]);
            $file = glob(public_path().$Organizacion->Ruta_Archivo);
            unlink($file[0]); 
            $Organizacion->delete();
        }

        return "hecho org";
    }

    public function ObtenerPertenenciaByProfesor($request){
        $idProfesor = $request->get('idProfe');
        $organizacion = Organizaciones::select('id', 'Nombre_Organizacion', 'Periodo', 'Anio', 'Descripcion', 'Ruta_Archivo', 'NombreArchivo')
            ->where('Id_Profesor', '=', $idProfesor)->get();
        return $organizacion;
    }
}
