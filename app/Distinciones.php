<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Distinciones extends Model
{
    protected $fillable = [
        'id',
        'Id_Profesor',
        'Nombre_Distincion',
        'Anio',
        'Periodo',
        'Descripcion',
        'Ruta_Archivo',
        'NombreArchivo'
    ];

    public function RegistrarDistincion($request){
        $archivo = $request->file('Archivo');
        $anio = $request->get('Anio');
        $periodo = $request->get('Periodo');
        $tipoDistincion = $request->get('Nombre_Distincion');
        
        $NombreArchivo="";
        $RutaArchivo="";

        if($tipoDistincion=="0"){
            $tipoDistincion = $request->get('OpcionOtro');
        }

        $profesor = new Profesores();
        $profesor = $profesor->ObtenerNombreProfesor($request->get('idProfesor'));
        $inicialesProf = "";
        $aux2=explode(" ", $profesor[0]->Nombre);
        for ($i=0; $i < count($aux2) ; $i++) { 
            $inicialesProf = $inicialesProf . substr($aux2[$i], 0, 1);
        }
        $inicialesProf = $inicialesProf . substr($profesor[0]->Apellido_P, 0, 1);
        $inicialesProf = $inicialesProf . substr($profesor[0]->Apellido_M, 0, 1);
        
        if($archivo!=null){
            try {
                mkdir(public_path().'/storage/Documentos/Profesores/Distincion/'.$request->get('idProfesor').'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }
    
            $extension = $archivo->getClientOriginalExtension();
            $fileName = $inicialesProf."-".$tipoDistincion."-".$periodo.'-'.$anio.'.'.$extension;
            $tmpPath = $archivo;
            $newPath = public_path().'/storage/Documentos/Profesores/Distincion/'.$request->get('idProfesor').'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);    
            
            $NombreArchivo=$fileName;
            $RutaArchivo='/storage/Documentos/Profesores/Distincion/'.$request->get('idProfesor').'/'.$fileName;
        }

        
        $datos = new Distinciones ([
            'Id_Profesor'=> $request->get('idProfesor'),
            'Nombre_Distincion'=> $tipoDistincion,
            'Periodo'=> $request->get('Periodo'),
            'Anio'=> $request->get('Anio'),
            'Descripcion'=> $request->get('Descripcion'),
            'Ruta_Archivo'=> $RutaArchivo,
            'NombreArchivo'=> $NombreArchivo
        ]); 
        $datos->save();

        return "hecho";
    }

    public function EliminarDistincion($request){
        $ids = $request->get('Ids');
        for ($i=0; $i < count($ids); $i++) { 
            $Distincion = Distinciones::find($ids[$i]);
            if ($Distincion->Ruta_Archivo!=null) {
                $file = glob(public_path().$Distincion->Ruta_Archivo);
                unlink($file[0]); 
            }
            $Distincion->delete();
        }

        return "hecho Dis";
    }

    public function ModificarDistincion($request){
        $archivo = $request->file('Archivo');
        $anio = $request->get('Anio');
        $periodo = $request->get('Periodo');
        $tipoDistincion = $request->get('Nombre_Distincion');
        
        $NombreArchivo="";
        $RutaArchivo="";

        $idRegistro = $request->get('IdRegistro');

        $Distincion = Distinciones::find($idRegistro);

        if($tipoDistincion=="0"){
            $tipoDistincion = $request->get('OpcionOtro');
        }

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
                mkdir(public_path().'/storage/Documentos/Profesores/Distincion/'.$request->get('idProfesor').'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }
            try {
                $file = glob(public_path().$Distincion->Ruta_Archivo);
                unlink($file[0]);
            }catch(\Throwable $th){} 

            $extension = $archivo->getClientOriginalExtension();
            $fileName = $inicialesProf."-".$tipoDistincion."-".$periodo.'-'.$anio.'.'.$extension;
            $tmpPath = $archivo;
            $newPath = public_path().'/storage/Documentos/Profesores/Distincion/'.$request->get('idProfesor').'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $NombreArchivo=$fileName;
            $RutaArchivo='/storage/Documentos/Profesores/Distincion/'.$request->get('idProfesor').'/'.$fileName;
        }else{
            if ($Distincion->Ruta_Archivo!=null) {
                $extension = "pdf";
                $fileName = $inicialesProf."-".$tipoDistincion."-".$periodo.'-'.$anio.'.'.$extension;
                $newPath = public_path().'/storage/Documentos/Profesores/Distincion/'.$request->get('idProfesor').'/'.$fileName;
                rename(public_path().$Distincion->Ruta_Archivo,$newPath);
                $NombreArchivo=$fileName;
                $RutaArchivo='/storage/Documentos/Profesores/Distincion/'.$request->get('idProfesor').'/'.$fileName;
            }
        }

        $Distincion->Nombre_Distincion = $tipoDistincion;
        $Distincion->Id_Profesor = $request->get('idProfesor');
        $Distincion->Anio = $request->get('Anio');
        $Distincion->Periodo = $request->get('Periodo');
        $Distincion->Descripcion = $request->get('Descripcion');
        $Distincion->Ruta_Archivo = $RutaArchivo;
        $Distincion->NombreArchivo = $NombreArchivo;
        
        $Distincion->save();

        return "cambios hechos Dis";
    }


    public function ObtenerDistincionByProfesor($request){
        $idProfesor = $request->get('idProfe');
        $Distinciones = Distinciones::select('id', 'Nombre_Distincion', 'Anio', 'Periodo', 'Descripcion', 'Ruta_Archivo', 'NombreArchivo')
            ->where('Id_Profesor', '=', $idProfesor)->get();
        return $Distinciones;
    }
}
