<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TrabajosEnSectores extends Model
{
    protected $fillable = [
        'id',
        'IdConvenio',
        'Institucion',
        'NombreProyecto',
        'ResponsableProyecto',
        'ProfResponsable',
        'anioInicio',
        'anioFin',
        'RutaArchivoEvidencia',
        'NombreArchivoEvidencia'
    ];

    public function mostrarTrabajoSector(){
        $trabajos = TrabajosEnSectores::join('convenios_movilidads', 'trabajos_en_sectores.IdConvenio', '=', 'convenios_movilidads.id')
            ->join('profesores', 'trabajos_en_sectores.ProfResponsable', '=', 'profesores.id')            
            ->select('trabajos_en_sectores.id', 'convenios_movilidads.Nombre_Clave', 'NombreProyecto', 'profesores.Nombre', 'profesores.Apellido_P', 'profesores.Apellido_M', 'trabajos_en_sectores.anioInicio', 'trabajos_en_sectores.anioFin')
            ->orderBy('NombreProyecto', 'DESC')->get();
        return $trabajos;
    }

    public function FiltradoTS($request){
        $mostrar = $request->get('mostrar');
        switch ($mostrar) {
            case 'Todos':
                $trabajos = TrabajosEnSectores::join('convenios_movilidads', 'trabajos_en_sectores.IdConvenio', '=', 'convenios_movilidads.id')
                    ->join('profesores', 'trabajos_en_sectores.ProfResponsable', '=', 'profesores.id')            
                    ->select('trabajos_en_sectores.id', 'convenios_movilidads.Nombre_Clave', 'NombreProyecto', 'profesores.Nombre', 'profesores.Apellido_P', 'profesores.Apellido_M', 'trabajos_en_sectores.anioInicio', 'trabajos_en_sectores.anioFin')
                    ->orderBy('NombreProyecto', 'DESC')->get();
                
                break;
            default:
                $trabajos = TrabajosEnSectores::join('convenios_movilidads', 'trabajos_en_sectores.IdConvenio', '=', 'convenios_movilidads.id')
                    ->join('profesores', 'trabajos_en_sectores.ProfResponsable', '=', 'profesores.id')
                    ->select('trabajos_en_sectores.id', 'convenios_movilidads.Nombre_Clave', 'NombreProyecto', 'profesores.Nombre', 'profesores.Apellido_P', 'profesores.Apellido_M', 'trabajos_en_sectores.anioInicio', 'trabajos_en_sectores.anioFin')
                    ->where('trabajos_en_sectores.IdConvenio', '=', $mostrar)
                    ->orderBy('Nombre_Clave', 'DESC')->get();
                
                break;
        }
        return $trabajos;
    }

    public function BusquedaTS($request){
        $opcion = $request->opcionBusqueda;
        $text = $request->textBusqueda;
        if($text != ""){
            switch ($opcion) {
                case 'Nombre_Clave':
                    $ts = TrabajosEnSectores::join('convenios_movilidads', 'trabajos_en_sectores.IdConvenio', '=', 'convenios_movilidads.id')
                        ->join('profesores', 'trabajos_en_sectores.ProfResponsable', '=', 'profesores.id')  
                        ->select('trabajos_en_sectores.id', 'convenios_movilidads.Nombre_Clave', 'NombreProyecto', 'profesores.Nombre', 'profesores.Apellido_P', 'profesores.Apellido_M', 'trabajos_en_sectores.anioInicio', 'trabajos_en_sectores.anioFin')
                        ->where('convenios_movilidads.Nombre_Clave', 'like', '%'.$text.'%')
                        ->orderBy('Nombre_Clave', 'DESC')->get();
                    break;
                case 'Profesor':
                    $ts = TrabajosEnSectores::join('convenios_movilidads', 'trabajos_en_sectores.IdConvenio', '=', 'convenios_movilidads.id')
                        ->join('profesores', 'trabajos_en_sectores.ProfResponsable', '=', 'profesores.id')  
                        ->select('trabajos_en_sectores.id', 'convenios_movilidads.Nombre_Clave', 'NombreProyecto', 'profesores.Nombre', 'profesores.Apellido_P', 'profesores.Apellido_M', 'trabajos_en_sectores.anioInicio', 'trabajos_en_sectores.anioFin')
                        ->where('profesores.Nombre', 'like', '%'.$text.'%')
                        ->orWhere('profesores.Apellido_P', 'like', '%'.$text.'%')
                        ->orWhere('profesores.Apellido_M', 'like', '%'.$text.'%')
                        ->orderBy('profesores.Apellido_P', 'DESC')->get();
                    break;
                default:
                    $ts = TrabajosEnSectores::join('convenios_movilidads', 'trabajos_en_sectores.IdConvenio', '=', 'convenios_movilidads.id')
                        ->join('profesores', 'trabajos_en_sectores.ProfResponsable', '=', 'profesores.id')  
                        ->select('trabajos_en_sectores.id', 'convenios_movilidads.Nombre_Clave', 'NombreProyecto', 'profesores.Nombre', 'profesores.Apellido_P', 'profesores.Apellido_M', 'trabajos_en_sectores.anioInicio', 'trabajos_en_sectores.anioFin')
                        ->where('trabajos_en_sectores.NombreProyecto', 'like', '%'.$text.'%')
                        ->orderBy('trabajos_en_sectores.NombreProyecto', 'DESC')->get();
                    break;
            }
        }else{
            $ts = TrabajosEnSectores::join('convenios_movilidads', 'trabajos_en_sectores.IdConvenio', '=', 'convenios_movilidads.id')
                ->join('profesores', 'trabajos_en_sectores.ProfResponsable', '=', 'profesores.id')            
                ->select('trabajos_en_sectores.id', 'convenios_movilidads.Nombre_Clave', 'NombreProyecto', 'profesores.Nombre', 'profesores.Apellido_P', 'profesores.Apellido_M', 'trabajos_en_sectores.anioInicio', 'trabajos_en_sectores.anioFin')
                ->orderBy('NombreProyecto', 'DESC')->get();
        }
            
        return $ts;
    }

    public function ObtenerDatosGeneralesTS($request){
        $idTS = $request->get('idTS');
        $TS = TrabajosEnSectores::join('convenios_movilidads', 'trabajos_en_sectores.IdConvenio', '=', 'convenios_movilidads.id')
            ->join('profesores', 'trabajos_en_sectores.ProfResponsable', '=', 'profesores.id')
            ->leftJoin('experiencias_educativas', 'trabajos_en_sectores.EEasociada', '=', 'experiencias_educativas.id')
            ->leftjoin('plan_estudios', 'experiencias_educativas.id_Plan', '=', 'plan_estudios.id')
            ->select('trabajos_en_sectores.id', 'IdConvenio', 'convenios_movilidads.Nombre_Clave', 'trabajos_en_sectores.Institucion', 'NombreProyecto', 'ResponsableProyecto', 'ProfResponsable', 'profesores.Nombre', 'profesores.Apellido_P', 'profesores.Apellido_M', 'anioInicio', 'anioFin', 'RutaArchivoEvidencia', 'NombreArchivoEvidencia', 'EEasociada', 'experiencias_educativas.NombreEE', 'experiencias_educativas.id_Plan', 'plan_estudios.Nombre as NombrePlan')
            ->where('trabajos_en_sectores.id', '=', $idTS)->get();
        return $TS;
    }

    public function RegistrarDG($request){
        
        $datos = new TrabajosEnSectores([
            'IdConvenio'=> $request->get('IdConvenio'),
            'Institucion'=> $request->get('Institucion'),
            'NombreProyecto'=> $request->get('NombreProyecto'),
            'ResponsableProyecto'=> $request->get('ResponsableProyecto'),
            'ProfResponsable'=> $request->get('IdProfesorResponsable'),
            'anioInicio'=> $request->get('AnioInicio'),
            'anioFin'=> $request->get('AnioFin')
        ]); 
        $datos->save();
        $idTS = $datos->id;

        $TS = TrabajosEnSectores::find($idTS);

        if ($request->file('ArchivoEvidencia')!=null) {
            $ArchivoEvidencia = $request->file('ArchivoEvidencia');

            try {
                mkdir(public_path().'/storage/Documentos/TrabajosEnSector/'.$idTS.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreInstitucion = $request->get('Institucion');
            $NombreClave="";
            $Anio="";
            
            $aux3=explode(" ",$NombreInstitucion);
            if(count($aux3)>1){
                for ($i=0; $i < count($aux3) ; $i++) { 
                    $NombreClave = $NombreClave . substr($aux3[$i], 0, 1);
                }
            }else{
                $NombreClave = $NombreInstitucion;
            }

            if ($request->get('AnioInicio')==$request->get('AnioFin')) {
                $Anio=$request->get('AnioInicio');
            }else{
                $Anio=$request->get('AnioInicio')."-".$request->get('AnioFin');
            }

            $NombreArchivo = $NombreClave."-".$Anio."-Practicas con Sector.";

            $extension = $ArchivoEvidencia->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $ArchivoEvidencia;
            $newPath = public_path().'/storage/Documentos/TrabajosEnSector/'.$idTS.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/TrabajosEnSector/'.$idTS.'/'.$fileName;
            $NombreArchivo = $fileName;

            $TS->NombreArchivoEvidencia = $NombreArchivo;
            $TS->RutaArchivoEvidencia = $RutaArchivo;
        }

        $TS->save();

        return $idTS;
    }

    public function ModificarDG($request, $id){
        $archivo = $request->file('ArchivoCartaLib');

        $TS = TrabajosEnSectores::find($id);

        $TS->IdConvenio = $request->get('IdConvenio');
        $TS->Institucion = $request->get('Institucion');
        $TS->NombreProyecto = $request->get('NombreProyecto');
        $TS->ResponsableProyecto = $request->get('ResponsableProyecto');
        $TS->ProfResponsable = $request->get('IdProfesorResponsable');
        $TS->anioInicio = $request->get('AnioInicio');
        $TS->anioFin = $request->get('AnioFin');
        $TS->EEasociada = $request->get('IdEE');

        $NombreInstitucion = $request->get('Institucion');
        $NombreClave="";
        $Anio="";
            
        $aux3=explode(" ",$NombreInstitucion);
        if(count($aux3)>1){
            for ($i=0; $i < count($aux3) ; $i++) { 
                $NombreClave = $NombreClave . substr($aux3[$i], 0, 1);
            }
        }else{
            $NombreClave = $NombreInstitucion;
        }

        if ($request->get('AnioInicio')==$request->get('AnioFin')) {
            $Anio=$request->get('AnioInicio');
        }else{
            $Anio=$request->get('AnioInicio')."-".$request->get('AnioFin');
        }

        $NombreArchivo = $NombreClave."-".$Anio."-Practicas con Sector.";

        if ($request->file('ArchivoEvidencia')!=null) {
            if($TS->RutaArchivoEvidencia!=null){
                try {
                    $file = glob(public_path().$TS->RutaArchivoEvidencia);
                    unlink($file[0]);
                }catch(\Throwable $th){} 
            }

            $ArchivoEvidencia = $request->file('ArchivoEvidencia');

            try {
                mkdir(public_path().'/storage/Documentos/TrabajosEnSector/'.$id.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $extension = $ArchivoEvidencia->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $ArchivoEvidencia;
            $newPath = public_path().'/storage/Documentos/TrabajosEnSector/'.$id.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/TrabajosEnSector/'.$id.'/'.$fileName;
            $NombreArchivo = $fileName;

            $TS->NombreArchivoEvidencia=$NombreArchivo;
            $TS->RutaArchivoEvidencia=$RutaArchivo;
        }else{
            if($TS->RutaArchivoEvidencia!=null){
                $extension = "pdf";
                $fileName = $NombreArchivo.$extension;
                $newPath = public_path().'/storage/Documentos/TrabajosEnSector/'.$id.'/'.$fileName;
                rename(public_path().$TS->RutaArchivoEvidencia,$newPath);

                $RutaArchivo = '/storage/Documentos/TrabajosEnSector/'.$id.'/'.$fileName;
                $NombreArchivo = $fileName;
                $TS->NombreArchivoEvidencia=$NombreArchivo;
                $TS->RutaArchivoEvidencia=$RutaArchivo;
            }
        }

        $TS->save();
        return "Cambios DG hechos";
    }

    public function EliminarTrabajoEnSector($request){
        $ts = TrabajosEnSectores::find($request->get('idTS'));
        $ts->delete();

        function rmDir_rf($carpeta){
            foreach(glob($carpeta . "/*") as $archivos_carpeta){             
                if (is_dir($archivos_carpeta)){
                    rmDir_rf($archivos_carpeta);
                } else {
                    unlink($archivos_carpeta);
                }
            }
            rmdir($carpeta);
        }

        try {
            rmDir_rf(public_path().'/storage/Documentos/TrabajosEnSector/'.$request->get('idTS'));
        } catch (\Throwable $th) {
            //throw $th;
        }

        return "Registro eliminado";
    }

    
}
