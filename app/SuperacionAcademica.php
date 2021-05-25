<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SuperacionAcademica extends Model
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

    public function RegistrarSuperacionAcademica($request){
        $archivo = $request->file('Archivo');
        $anio = $request->get('Anio');
        $titulo = $request->get('Titulo');
        $tipoId = $request->get('Tipo_Documento');

        $obj = new DocumentosSuperacion();

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

        try {
            mkdir(public_path().'/storage/Documentos/SuperacionAcademica/'.$request->get('idProfesor').'/', 0700);
        } catch (\Throwable $th) {
            //throw $th;
        }
        
        $extension = $archivo->getClientOriginalExtension();
        $fileName = $inicialesProf."-".$tipoDocumento."-".$iniciales.'-'.$anio.'.'.$extension;
        $tmpPath = $archivo;
        $newPath = public_path().'/storage/Documentos/SuperacionAcademica/'.$request->get('idProfesor').'/'.$fileName;
        move_uploaded_file($tmpPath,$newPath);

        $datos = new SuperacionAcademica ([
            'Id_Profesor'=> $request->get('idProfesor'),
            'Tipo_Documento'=> $tipoId,
            'Titulo'=> $request->get('Titulo'),
            'Periodo'=> $request->get('Periodo'),
            'Anio'=> $request->get('Anio'),
            'Descripcion'=> $request->get('Descripcion'),
            'Ruta_Archivo'=> '/storage/Documentos/SuperacionAcademica/'.$request->get('idProfesor').'/'.$fileName,
            'NombreArchivo'=> $fileName
        ]); 
        $datos->save();

        return "hecho";
    }

    public function ModificarSuperacionAcademica($request){
        $archivo = $request->file('Archivo');
        $anio = $request->get('Anio');
        $titulo = $request->get('Titulo');
        $tipoId = $request->get('Tipo_Documento');
        $idRegistro = $request->get('IdRegistro');

        $obj = new DocumentosSuperacion();
        $Superacion = SuperacionAcademica::find($idRegistro);

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
                $file = glob(public_path().$Superacion->Ruta_Archivo);
                unlink($file[0]);
            }catch(\Throwable $th){} 

            $extension = $archivo->getClientOriginalExtension();
            $fileName = $inicialesProf."-".$tipoDocumento."-".$iniciales.'-'.$anio.'.'.$extension;
            $tmpPath = $archivo;
            $newPath = public_path().'/storage/Documentos/SuperacionAcademica/'.$request->get('idProfesor').'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);
        }else{
            $extension = "pdf";
            $fileName = $inicialesProf."-".$tipoDocumento."-".$iniciales.'-'.$anio.'.'.$extension;
            $newPath = public_path().'/storage/Documentos/SuperacionAcademica/'.$request->get('idProfesor').'/'.$fileName;
            rename(public_path().$Superacion->Ruta_Archivo,$newPath);
        }

        $Superacion->Titulo = $request->get('Titulo');
        $Superacion->Id_Profesor = $request->get('idProfesor');
        $Superacion->Tipo_Documento = $tipoId;
        $Superacion->Anio = $request->get('Anio');
        $Superacion->Periodo = $request->get('Periodo');
        $Superacion->Descripcion = $request->get('Descripcion');
        $Superacion->Ruta_Archivo = '/storage/Documentos/SuperacionAcademica/'.$request->get('idProfesor').'/'.$fileName;
        $Superacion->NombreArchivo = $fileName;
        
        $Superacion->save();

        return "cambios hechos sup";
    }

    public function EliminarSuperacionAcademica($request){
        $ids = $request->get('Ids');
        for ($i=0; $i < count($ids); $i++) { 
            $Superacion = SuperacionAcademica::find($ids[$i]);
            $file = glob(public_path().$Superacion->Ruta_Archivo);
            unlink($file[0]); 
            $Superacion->delete();
        }

        return "hecho sup";
    }

    public function ObtenerSuperacionByProfesor($request){
        $idProfesor = $request->get('idProfe');
        $Superacion = SuperacionAcademica::join('documentos_superacions', 'superacion_academicas.Tipo_Documento', '=', 'documentos_superacions.id')
            ->select('superacion_academicas.id', 'Titulo', 'Tipo_Documento', 'documentos_superacions.Tipo as TipoDocumento', 'Periodo', 'Anio', 'Descripcion', 'Ruta_Archivo', 'NombreArchivo')
            ->where('Id_Profesor', '=', $idProfesor)->get();
        return $Superacion;
    }
}
