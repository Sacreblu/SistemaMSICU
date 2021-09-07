<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EstudiosProfesores extends Model
{
    protected $fillable = [
        'id',
        'Titulo',
        'Id_Profesor',
        'Id_Grado',
        'Universidad',
        'Anio',
        'Lugar',
        'Ruta_Archivo',
        'NombreArchivo'
    ];

    public function RegistrarPreparacionAcademica($request){
        $archivo = $request->file('Archivo');
        $anio = $request->get('Anio');
        $titulo = $request->get('Titulo');
        $grados = ['Licenciatura', 'Maestria', 'Doctorado'];

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
            mkdir(public_path().'/storage/Documentos/Profesores/PreparacionAcademica/'.$request->get('idProfesor').'/', 0700);
        } catch (\Throwable $th) {
            //throw $th;
        }
        
        $extension = $archivo->getClientOriginalExtension();
        $fileName = $inicialesProf."-".$grados[$request->get('Id_Grado')-1]."-".$iniciales.'-'.$anio.'.'.$extension;
        $tmpPath = $archivo;
        $newPath = public_path().'/storage/Documentos/Profesores/PreparacionAcademica/'.$request->get('idProfesor').'/'.$fileName;
        move_uploaded_file($tmpPath,$newPath);

        $datos = new EstudiosProfesores ([
            'Titulo'=> $request->get('Titulo'),
            'Id_Profesor'=> $request->get('idProfesor'),
            'Id_Grado'=> $request->get('Id_Grado'),
            'Universidad'=> $request->get('Universidad'),
            'Anio'=> $request->get('Anio'),
            'Lugar'=> $request->get('Lugar'),
            'Ruta_Archivo'=> '/storage/Documentos/Profesores/PreparacionAcademica/'.$request->get('idProfesor').'/'.$fileName,
            'NombreArchivo'=> $fileName
        ]); 
        $datos->save();

        return "hecho";
    }

    public function EliminarPreparacionAcademica($request){
        $ids = $request->get('Ids');
        for ($i=0; $i < count($ids); $i++) { 
            $Estudios = EstudiosProfesores::find($ids[$i]);
            $file = glob(public_path().$Estudios->Ruta_Archivo);
            unlink($file[0]); 
            $Estudios->delete();
        }

        
        return "hecho";
    }

    public function ModificarPreparacionAcademica($request){
        $archivo = $request->file('Archivo');
        $anio = $request->get('Anio');
        $titulo = $request->get('Titulo');
        $grados = ['Licenciatura', 'Maestria', 'Doctorado'];
        $idRegistro = $request->get('IdRegistro');

        $Estudios = EstudiosProfesores::find($idRegistro);

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
                $file = glob(public_path().$Estudios->Ruta_Archivo);
                unlink($file[0]);
            }catch(\Throwable $th){} 

            $extension = $archivo->getClientOriginalExtension();
            $fileName = $inicialesProf."-".$grados[$request->get('Id_Grado')-1]."-".$iniciales.'-'.$anio.'.'.$extension;
            $tmpPath = $archivo;
            $newPath = public_path().'/storage/Documentos/Profesores/PreparacionAcademica/'.$request->get('idProfesor').'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);
        }else{
            $extension = "pdf";
            $fileName = $inicialesProf."-".$grados[$request->get('Id_Grado')-1]."-".$iniciales.'-'.$anio.'.'.$extension;
            $newPath = public_path().'/storage/Documentos/Profesores/PreparacionAcademica/'.$request->get('idProfesor').'/'.$fileName;
            rename(public_path().$Estudios->Ruta_Archivo,$newPath);
        }

        $Estudios->Titulo = $request->get('Titulo');
        $Estudios->Id_Profesor = $request->get('idProfesor');
        $Estudios->Id_Grado = $request->get('Id_Grado');
        $Estudios->Universidad = $request->get('Universidad');
        $Estudios->Anio = $request->get('Anio');
        $Estudios->Lugar = $request->get('Lugar');
        $Estudios->Ruta_Archivo = '/storage/Documentos/Profesores/PreparacionAcademica/'.$request->get('idProfesor').'/'.$fileName;
        $Estudios->NombreArchivo = $fileName;
        
        $Estudios->save();

        return "cambios hechos";
    }

    public function ObtenerEstudiosByProfesor($request){
        $idProfesor = $request->get('idProfe');
        $Estudios = EstudiosProfesores::join('grados_academicos', 'estudios_profesores.Id_Grado', '=', 'grados_academicos.id')
            ->select('estudios_profesores.id','Titulo', 'grados_academicos.Grado as Grado', 'Id_Grado', 'Universidad', 'Anio', 'Lugar', 'Ruta_Archivo', 'NombreArchivo')
            ->where('Id_Profesor', '=', $idProfesor)->get();
        return $Estudios;
    }
}
