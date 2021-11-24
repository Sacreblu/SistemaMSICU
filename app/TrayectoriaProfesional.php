<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TrayectoriaProfesional extends Model
{
    protected $fillable = [
        'id',
        'Id_Profesor',
        'Tipo_Documento',
        'Titulo',
        'Anio',
        'Periodo',
        'Descripcion',
        'Ruta_Archivo',
        'NombreArchivo'
    ];

    public function RegistrarTrayectorias($request){
        $archivo = $request->file('Archivo');
        $anio = $request->get('Anio');
        $titulo = $request->get('Titulo');
        $tipoId = $request->get('Tipo_Documento');

        $NombreArchivo="";
        $RutaArchivo="";

        $obj = new TiposTrayectorias();

        if($tipoId!=0){
            $tipoDocumento = $obj->getNombreDocumento($tipoId);
            $tipoDocumento = $tipoDocumento[0]->Tipo;
        }else{
            $tipoDocumento = $request->get('OpcionOtro');
            $tipoId = $obj->RegistrarTipo($request->get('OpcionOtro'));
        }

        $iniciales = "";
        $aux=explode(" ", $titulo);
        for ($i=0; $i < count($aux) ; $i++) { 
            $iniciales = $iniciales . substr($aux[$i], 0, 1);
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

        if ($archivo!=null) {
            try {
                mkdir(public_path().'/storage/Documentos/Profesores/TrayectoriaProfesional/'.$request->get('idProfesor').'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }
            
            $extension = $archivo->getClientOriginalExtension();
            $fileName = $inicialesProf."-".$tipoDocumento."-".$iniciales.'-'.$anio.'.'.$extension;
            $tmpPath = $archivo;
            $newPath = public_path().'/storage/Documentos/Profesores/TrayectoriaProfesional/'.$request->get('idProfesor').'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $NombreArchivo=$fileName;
            $RutaArchivo='/storage/Documentos/Profesores/TrayectoriaProfesional/'.$request->get('idProfesor').'/'.$fileName;
        }
        
        $datos = new TrayectoriaProfesional ([
            'Id_Profesor'=> $request->get('idProfesor'),
            'Tipo_Documento'=> $tipoId,
            'Titulo'=> $request->get('Titulo'),
            'Periodo'=> $request->get('Periodo'),
            'Anio'=> $request->get('Anio'),
            'Descripcion'=> $request->get('Descripcion'),
            'Ruta_Archivo'=> $RutaArchivo,
            'NombreArchivo'=> $NombreArchivo
        ]); 
        $datos->save();

        return "hecho";
    }

    public function ModificarTrayectoria($request){
        $archivo = $request->file('Archivo');
        $anio = $request->get('Anio');
        $titulo = $request->get('Titulo');
        $tipoId = $request->get('Tipo_Documento');

        $idRegistro = $request->get('IdRegistro');

        $NombreArchivo="";
        $RutaArchivo="";

        $obj = new TiposTrayectorias();
        $Trayectoria = TrayectoriaProfesional::find($idRegistro);

        if($tipoId!=0){
            $tipoDocumento = $obj->getNombreDocumento($tipoId);
            $tipoDocumento = $tipoDocumento[0]->Tipo;
        }else{
            $tipoDocumento = $request->get('OpcionOtro');
            $tipoId = $obj->RegistrarTipo($request->get('OpcionOtro'));
        }

        $iniciales = "";
        $aux=explode(" ", $titulo);
        for ($i=0; $i < count($aux) ; $i++) { 
            $iniciales = $iniciales . substr($aux[$i], 0, 1);
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
                mkdir(public_path().'/storage/Documentos/Profesores/TrayectoriaProfesional/'.$request->get('idProfesor').'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }
            try {
                $file = glob(public_path().$Trayectoria->Ruta_Archivo);
                unlink($file[0]);
            }catch(\Throwable $th){} 

            $extension = $archivo->getClientOriginalExtension();
            $fileName = $inicialesProf."-".$tipoDocumento."-".$iniciales.'-'.$anio.'.'.$extension;
            $tmpPath = $archivo;
            $newPath = public_path().'/storage/Documentos/Profesores/TrayectoriaProfesional/'.$request->get('idProfesor').'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);
            
            $NombreArchivo=$fileName;
            $RutaArchivo='/storage/Documentos/Profesores/TrayectoriaProfesional/'.$request->get('idProfesor').'/'.$fileName;
        }else{
            if ($Trayectoria->Ruta_Archivo!=null) {
                $extension = "pdf";
                $fileName = $inicialesProf."-".$tipoDocumento."-".$iniciales.'-'.$anio.'.'.$extension;
                $newPath = public_path().'/storage/Documentos/Profesores/TrayectoriaProfesional/'.$request->get('idProfesor').'/'.$fileName;
                rename(public_path().$Trayectoria->Ruta_Archivo,$newPath);

                $NombreArchivo=$fileName;
                $RutaArchivo='/storage/Documentos/Profesores/TrayectoriaProfesional/'.$request->get('idProfesor').'/'.$fileName;
            }
        }

        $Trayectoria->Titulo = $request->get('Titulo');
        $Trayectoria->Id_Profesor = $request->get('idProfesor');
        $Trayectoria->Tipo_Documento = $tipoId;
        $Trayectoria->Anio = $request->get('Anio');
        $Trayectoria->Periodo = $request->get('Periodo');
        $Trayectoria->Descripcion = $request->get('Descripcion');
        $Trayectoria->Ruta_Archivo = $RutaArchivo;
        $Trayectoria->NombreArchivo = $NombreArchivo;
        
        $Trayectoria->save();

        return "cambios hechos Tra";
    }

    public function EliminarTrayectoria($request){
        $ids = $request->get('Ids');
        for ($i=0; $i < count($ids); $i++) { 
            $Trayectoria = TrayectoriaProfesional::find($ids[$i]);
            if ($Trayectoria->Ruta_Archivo!=null) {
                $file = glob(public_path().$Trayectoria->Ruta_Archivo);
                unlink($file[0]); 
            }
            $Trayectoria->delete();
        }

        return "hecho Tra";
    }

    public function ObtenerTrayectoriaByProfesor($request){
        $idProfesor = $request->get('idProfe');
        $Trayectoria = TrayectoriaProfesional::join('tipos_trayectorias', 'trayectoria_profesionals.Tipo_Documento', '=', 'tipos_trayectorias.id')
            ->select('trayectoria_profesionals.id', 'Titulo', 'Tipo_Documento', 'tipos_trayectorias.Tipo as TipoDocumento', 'Periodo', 'Anio', 'Descripcion', 'Ruta_Archivo', 'NombreArchivo')
            ->where('Id_Profesor', '=', $idProfesor)->get();
        return $Trayectoria;
    }
}
