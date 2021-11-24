<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AccionesMovilidad extends Model
{
    protected $fillable = [
        'id',
        'IdConvenio',
        'IdEstudiante',
        'PeriodoInicio',
        'PeriodoConclusion',
        'InstitucionOrigen',
        'InstitucionDestino',
        'DependenciaOrigen',
        'DependenciaDestino',
        'ProgramaOrigen',
        'ProgramaDestino',
        'Motivo',
        'NombreFormatoSolicitud',
        'RutaFormatoSolicitud',
        'NombreCartaMovilidad',
        'RutaCartaMovilidad',
        'NombreCartaAceptacion',
        'RutaCartaAceptacion',
        'NombreReporteActividades',
        'RutaReporteActividades',
        'NombreDocumentacionComp',
        'RutaDocumentacionComp',
        'NombreCartaLiberacion',
        'RutaCartaLiberacion',
        'NombreArchivoCongreso',
        'RutaArchivoCongreso',
    ];

    public function MostrarAcciones(){
        $acciones = AccionesMovilidad::join('estudiantes', 'acciones_movilidads.IdEstudiante', '=', 'estudiantes.id')
                        ->join('convenios_movilidads', 'acciones_movilidads.IdConvenio', '=', 'convenios_movilidads.id')
                        ->select('acciones_movilidads.id', 'convenios_movilidads.Nombre_Clave', 'convenios_movilidads.Sector', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'InstitucionDestino', 'PeriodoInicio', 'PeriodoConclusion')
                        ->where('convenios_movilidads.Sector', '=', '4')
                        ->orderBy('convenios_movilidads.Nombre_Clave', 'DESC')->get();
        return $acciones;
    }

    public function FiltradoMovilidades($request){
        $mostrar = $request->get('mostrar');
        switch ($mostrar) {
            case '1':
                $acciones = AccionesMovilidad::join('estudiantes', 'acciones_movilidads.IdEstudiante', '=', 'estudiantes.id')
                    ->join('convenios_movilidads', 'acciones_movilidads.IdConvenio', '=', 'convenios_movilidads.id')
                    ->select('acciones_movilidads.id', 'convenios_movilidads.Nombre_Clave', 'convenios_movilidads.Sector', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'InstitucionDestino', 'PeriodoInicio', 'PeriodoConclusion')
                    ->where([['ProgramaDestino', '=', 'Maestría en Sistemas Interactivos Centrados en el Usuario'], ['convenios_movilidads.Sector', '=', '4']])
                    ->orderBy('convenios_movilidads.Nombre_Clave', 'DESC')->get();
                break;
            case '2':
                $acciones = AccionesMovilidad::join('estudiantes', 'acciones_movilidads.IdEstudiante', '=', 'estudiantes.id')
                    ->join('convenios_movilidads', 'acciones_movilidads.IdConvenio', '=', 'convenios_movilidads.id')
                    ->select('acciones_movilidads.id', 'convenios_movilidads.Nombre_Clave', 'convenios_movilidads.Sector', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'InstitucionDestino', 'PeriodoInicio', 'PeriodoConclusion')
                    ->where([['ProgramaOrigen', '=', 'Maestría en Sistemas Interactivos Centrados en el Usuario'], ['convenios_movilidads.Sector', '=', '4']])
                    ->orderBy('Nombre_Clave', 'DESC')->get();
                break;
            default:
                $acciones = AccionesMovilidad::join('estudiantes', 'acciones_movilidads.IdEstudiante', '=', 'estudiantes.id')
                    ->join('convenios_movilidads', 'acciones_movilidads.IdConvenio', '=', 'convenios_movilidads.id')
                    ->select('acciones_movilidads.id', 'convenios_movilidads.Nombre_Clave', 'convenios_movilidads.Sector', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'InstitucionDestino', 'PeriodoInicio', 'PeriodoConclusion')
                    ->where('convenios_movilidads.Sector', '=', '4')
                    ->orderBy('convenios_movilidads.Nombre_Clave', 'DESC')->get();
                
                break;
        }
        return $acciones;
    }

    public function BusquedaMovilidades($request){
        $opcion = $request->opcionBusqueda;
        $text = $request->textBusqueda;
        if($text != ""){
            switch ($opcion) {
                case 'Nombre_Clave':
                    $acciones = AccionesMovilidad::join('estudiantes', 'acciones_movilidads.IdEstudiante', '=', 'estudiantes.id')
                        ->join('convenios_movilidads', 'acciones_movilidads.IdConvenio', '=', 'convenios_movilidads.id')
                        ->select('acciones_movilidads.id', 'convenios_movilidads.Nombre_Clave', 'convenios_movilidads.Sector', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'InstitucionDestino', 'PeriodoInicio', 'PeriodoConclusion')
                        ->where([['convenios_movilidads.Nombre_Clave', 'like', '%'.$text.'%'], ['convenios_movilidads.Sector', '=', '4']])
                        ->orderBy('Nombre_Clave', 'DESC')->get();
                    break;
                
                default:
                    $acciones = AccionesMovilidad::join('estudiantes', 'acciones_movilidads.IdEstudiante', '=', 'estudiantes.id')
                        ->join('convenios_movilidads', 'acciones_movilidads.IdConvenio', '=', 'convenios_movilidads.id')
                        ->select('acciones_movilidads.id', 'convenios_movilidads.Nombre_Clave', 'convenios_movilidads.Sector', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'InstitucionDestino', 'PeriodoInicio', 'PeriodoConclusion')
                        ->where([['estudiantes.Nombre', 'like', '%'.$text.'%'], ['convenios_movilidads.Sector', '=', '4']])
                        ->orWhere([['estudiantes.Apellido_P', 'like', '%'.$text.'%'], ['convenios_movilidads.Sector', '=', '4']])
                        ->orWhere([['estudiantes.Apellido_P', 'like', '%'.$text.'%'], ['convenios_movilidads.Sector', '=', '4']])
                        ->orderBy('Nombre_Clave', 'DESC')->get();
                    break;
            }
        }else{
            $acciones = AccionesMovilidad::join('estudiantes', 'acciones_movilidads.IdEstudiante', '=', 'estudiantes.id')
                    ->join('convenios_movilidads', 'acciones_movilidads.IdConvenio', '=', 'convenios_movilidads.id')
                    ->select('acciones_movilidads.id', 'convenios_movilidads.Nombre_Clave', 'convenios_movilidads.Sector', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'InstitucionDestino', 'PeriodoInicio', 'PeriodoConclusion')
                    ->where('convenios_movilidads.Sector', '=', '4')
                    ->orderBy('convenios_movilidads.Nombre_Clave', 'DESC')->get();
        }
            
        return $acciones;
    }

    public function RegistrarDG($request){

        $periodoI=null;
        $periodoC=null;

        if($request->get('PeriodoComienzo')!=null){
            $periodoI = $request->get('PeriodoComienzo')."-01";
        }

        if($request->get('PeriodoConclusion')!=null){
            $periodoC = $request->get('PeriodoConclusion')."-01";
        }

        $datos = new AccionesMovilidad([
            'IdConvenio'=> $request->get('IdConvenio'),
            'IdEstudiante'=> $request->get('IdEstudiante'),
            'PeriodoInicio'=> $periodoI,
            'PeriodoConclusion'=> $periodoC,
            'InstitucionOrigen'=> $request->get('InstitucionOrigen'),
            'InstitucionDestino'=> $request->get('InstitucionDestino'),
            'DependenciaOrigen'=> $request->get('DependenciaOrigen'),
            'DependenciaDestino'=> $request->get('DependenciaDestino'),
            'ProgramaOrigen'=> $request->get('ProgramaOrigen'),
            'ProgramaDestino'=> $request->get('ProgramaDestino'),
            'Motivo'=> $request->get('Motivo'),
        ]); 
        $datos->save();
        $idAccion = $datos->id;

        $accion = AccionesMovilidad::find($idAccion);

        $inicialesEstudiante = "";
        $aux=explode(" ", $request->get('NombreEstudiante'));
        for ($i=0; $i < count($aux) ; $i++) { 
            $inicialesEstudiante = $inicialesEstudiante . substr($aux[$i], 0, 1);
        }

        if ($request->file('ArchivoFormMovilidad')!=null) {
            $formatoMovilidad = $request->file('ArchivoFormMovilidad');

            try {
                mkdir(public_path().'/storage/Documentos/AccionesMovilidad/'.$idAccion.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-FormatoSolicitud.";

            $extension = $formatoMovilidad->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $formatoMovilidad;
            $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$idAccion.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$idAccion.'/'.$fileName;
            $NombreArchivo = $fileName;

            $accion->NombreFormatoSolicitud = $NombreArchivo;
            $accion->RutaFormatoSolicitud = $RutaArchivo;
        }

        if ($request->file('ArchivoSolicitudMovilidad')!=null) {
            $cartaSolicitud = $request->file('ArchivoSolicitudMovilidad');

            try {
                mkdir(public_path().'/storage/Documentos/AccionesMovilidad/'.$idAccion.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-CartaSolicitud.";

            $extension = $cartaSolicitud->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $cartaSolicitud;
            $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$idAccion.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$idAccion.'/'.$fileName;
            $NombreArchivo = $fileName;
            
            $accion->NombreCartaMovilidad = $NombreArchivo;
            $accion->RutaCartaMovilidad = $RutaArchivo;
        }

        if ($request->file('ArchivoCartaAceptacion')!=null) {
            $cartaAceptacion = $request->file('ArchivoCartaAceptacion');

            try {
                mkdir(public_path().'/storage/Documentos/AccionesMovilidad/'.$idAccion.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-CartaAceptacion.";

            $extension = $cartaAceptacion->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $cartaAceptacion;
            $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$idAccion.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$idAccion.'/'.$fileName;
            $NombreArchivo = $fileName;

            $accion->NombreCartaAceptacion = $NombreArchivo;
            $accion->RutaCartaAceptacion = $RutaArchivo;
        }

        if ($request->file('ArchivoReporteActividades')!=null) {
            $archivoReportes = $request->file('ArchivoReporteActividades');

            try {
                mkdir(public_path().'/storage/Documentos/AccionesMovilidad/'.$idAccion.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-ReporteActividades.";

            $extension = $archivoReportes->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $archivoReportes;
            $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$idAccion.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$idAccion.'/'.$fileName;
            $NombreArchivo = $fileName;

            $accion->NombreReporteActividades = $NombreArchivo;
            $accion->RutaReporteActividades = $RutaArchivo;
        }

        if ($request->file('ArchivoCartaCumplimiento')!=null) {
            $cartaCumplimiento = $request->file('ArchivoCartaCumplimiento');

            try {
                mkdir(public_path().'/storage/Documentos/AccionesMovilidad/'.$idAccion.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-CartaCumplimiento.";

            $extension = $cartaCumplimiento->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $cartaCumplimiento;
            $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$idAccion.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$idAccion.'/'.$fileName;
            $NombreArchivo = $fileName;

            $accion->NombreDocumentacionComp = $NombreArchivo;
            $accion->RutaDocumentacionComp = $RutaArchivo;
        }

        if ($request->file('ArchivoCartaLiberacion')!=null) {
            $cartaLiberacion = $request->file('ArchivoCartaLiberacion');

            try {
                mkdir(public_path().'/storage/Documentos/AccionesMovilidad/'.$idAccion.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-CartaLiberacion.";

            $extension = $cartaLiberacion->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $cartaLiberacion;
            $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$idAccion.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$idAccion.'/'.$fileName;
            $NombreArchivo = $fileName;

            $accion->NombreCartaLiberacion = $NombreArchivo;
            $accion->RutaCartaLiberacion = $RutaArchivo;
        }

        if ($request->file('ArchivoCongreso')!=null) {
            $archivoCongreso = $request->file('ArchivoCongreso');

            try {
                mkdir(public_path().'/storage/Documentos/AccionesMovilidad/'.$idAccion.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-Congreso.";

            $extension = $archivoCongreso->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $archivoCongreso;
            $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$idAccion.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$idAccion.'/'.$fileName;
            $NombreArchivo = $fileName;
            
            $accion->NombreArchivoCongreso = $NombreArchivo;
            $accion->RutaArchivoCongreso = $RutaArchivo;
        }

        $accion->save();

        return $idAccion;
    }

    public function ModificarDG($request, $id){
        
        $accion = AccionesMovilidad::find($id);

        $accion->IdConvenio = $request->get('IdConvenio');
        $accion->IdEstudiante = $request->get('IdEstudiante');
        $accion->PeriodoInicio = $request->get('PeriodoComienzo')."-01";
        $accion->PeriodoConclusion = $request->get('PeriodoConclusion')."-01";
        $accion->InstitucionOrigen = $request->get('InstitucionOrigen');
        $accion->InstitucionDestino = $request->get('InstitucionDestino');
        $accion->DependenciaOrigen = $request->get('DependenciaOrigen');
        $accion->DependenciaDestino = $request->get('DependenciaDestino');
        $accion->ProgramaOrigen = $request->get('ProgramaOrigen');
        $accion->ProgramaDestino = $request->get('ProgramaDestino');
        $accion->Motivo = $request->get('Motivo');

        $inicialesEstudiante = "";
        $aux=explode(" ", $request->get('NombreEstudiante'));
        for ($i=0; $i < count($aux) ; $i++) { 
            $inicialesEstudiante = $inicialesEstudiante . substr($aux[$i], 0, 1);
        }

        if ($request->file('ArchivoFormMovilidad')!=null) {
            $formatoMovilidad = $request->file('ArchivoFormMovilidad');

            try {
                mkdir(public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-FormatoSolicitud.";

            $extension = $formatoMovilidad->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $formatoMovilidad;
            $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
            $NombreArchivo = $fileName;

            $accion->NombreFormatoSolicitud = $NombreArchivo;
            $accion->RutaFormatoSolicitud = $RutaArchivo;
        }else{
            if ($accion->RutaFormatoSolicitud!=null) {

                $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-FormatoSolicitud.";

                $extension = "pdf";
                $fileName = $NombreArchivo.$extension;
                $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
                rename(public_path().$accion->RutaFormatoSolicitud,$newPath);
            
                $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
                $NombreArchivo = $fileName;

                $accion->NombreFormatoSolicitud = $NombreArchivo;
                $accion->RutaFormatoSolicitud = $RutaArchivo;
            }
        }

        if ($request->file('ArchivoSolicitudMovilidad')!=null) {
            $cartaSolicitud = $request->file('ArchivoSolicitudMovilidad');

            try {
                mkdir(public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-CartaSolicitud.";

            $extension = $cartaSolicitud->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $cartaSolicitud;
            $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
            $NombreArchivo = $fileName;
            
            $accion->NombreCartaMovilidad = $NombreArchivo;
            $accion->RutaCartaMovilidad = $RutaArchivo;
        }else{
            if ($accion->RutaCartaMovilidad!=null) {

                $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-CartaSolicitud.";

                $extension = "pdf";
                $fileName = $NombreArchivo.$extension;
                $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
                rename(public_path().$accion->RutaCartaMovilidad,$newPath);
            
                $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
                $NombreArchivo = $fileName;

                $accion->NombreCartaMovilidad = $NombreArchivo;
                $accion->RutaCartaMovilidad = $RutaArchivo;
            }
        }

        if ($request->file('ArchivoCartaAceptacion')!=null) {
            $cartaAceptacion = $request->file('ArchivoCartaAceptacion');

            try {
                mkdir(public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-CartaAceptacion.";

            $extension = $cartaAceptacion->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $cartaAceptacion;
            $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
            $NombreArchivo = $fileName;

            $accion->NombreCartaAceptacion = $NombreArchivo;
            $accion->RutaCartaAceptacion = $RutaArchivo;
        }else{
            if ($accion->RutaCartaAceptacion!=null) {

                $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-CartaAceptacion.";

                $extension = "pdf";
                $fileName = $NombreArchivo.$extension;
                $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
                rename(public_path().$accion->RutaCartaAceptacion,$newPath);
            
                $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
                $NombreArchivo = $fileName;

                $accion->NombreCartaAceptacion = $NombreArchivo;
                $accion->RutaCartaAceptacion = $RutaArchivo;
            }
        }

        if ($request->file('ArchivoReporteActividades')!=null) {
            $archivoReportes = $request->file('ArchivoReporteActividades');

            try {
                mkdir(public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-ReporteActividades.";

            $extension = $archivoReportes->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $archivoReportes;
            $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
            $NombreArchivo = $fileName;

            $accion->NombreReporteActividades = $NombreArchivo;
            $accion->RutaReporteActividades = $RutaArchivo;
        }else{
            if ($accion->RutaReporteActividades!=null) {

                $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-ReporteActividades.";

                $extension = "pdf";
                $fileName = $NombreArchivo.$extension;
                $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
                rename(public_path().$accion->RutaReporteActividades,$newPath);
            
                $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
                $NombreArchivo = $fileName;

                $accion->NombreReporteActividades = $NombreArchivo;
                $accion->RutaReporteActividades = $RutaArchivo;
            }
        }

        if ($request->file('ArchivoCartaCumplimiento')!=null) {
            $cartaCumplimiento = $request->file('ArchivoCartaCumplimiento');

            try {
                mkdir(public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-CartaCumplimiento.";

            $extension = $cartaCumplimiento->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $cartaCumplimiento;
            $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
            $NombreArchivo = $fileName;

            $accion->NombreDocumentacionComp = $NombreArchivo;
            $accion->RutaDocumentacionComp = $RutaArchivo;
        }else{
            if ($accion->RutaDocumentacionComp!=null) {

                $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-CartaCumplimiento.";

                $extension = "pdf";
                $fileName = $NombreArchivo.$extension;
                $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
                rename(public_path().$accion->RutaDocumentacionComp,$newPath);
            
                $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
                $NombreArchivo = $fileName;

                $accion->NombreDocumentacionComp = $NombreArchivo;
                $accion->RutaDocumentacionComp = $RutaArchivo;
            }
        }

        if ($request->file('ArchivoCartaLiberacion')!=null) {
            $cartaLiberacion = $request->file('ArchivoCartaLiberacion');

            try {
                mkdir(public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-CartaLiberacion.";

            $extension = $cartaLiberacion->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $cartaLiberacion;
            $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
            $NombreArchivo = $fileName;

            $accion->NombreCartaLiberacion = $NombreArchivo;
            $accion->RutaCartaLiberacion = $RutaArchivo;
        }else{
            if ($accion->RutaCartaLiberacion!=null) {

                $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-CartaLiberacion.";

                $extension = "pdf";
                $fileName = $NombreArchivo.$extension;
                $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
                rename(public_path().$accion->RutaCartaLiberacion,$newPath);
            
                $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
                $NombreArchivo = $fileName;

                $accion->NombreCartaLiberacion = $NombreArchivo;
                $accion->RutaCartaLiberacion = $RutaArchivo;
            }
        }

        if ($request->file('ArchivoCongreso')!=null) {
            $archivoCongreso = $request->file('ArchivoCongreso');

            try {
                mkdir(public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-Congreso.";

            $extension = $archivoCongreso->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $archivoCongreso;
            $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
            $NombreArchivo = $fileName;
            
            $accion->NombreArchivoCongreso = $NombreArchivo;
            $accion->RutaArchivoCongreso = $RutaArchivo;
        }else{
            if ($accion->RutaArchivoCongreso!=null) {

                $NombreArchivo = $request->get('NombreConvenio')."-".$inicialesEstudiante."-Congreso.";

                $extension = "pdf";
                $fileName = $NombreArchivo.$extension;
                $newPath = public_path().'/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
                rename(public_path().$accion->RutaArchivoCongreso,$newPath);
            
                $RutaArchivo = '/storage/Documentos/AccionesMovilidad/'.$id.'/'.$fileName;
                $NombreArchivo = $fileName;

                $accion->NombreArchivoCongreso = $NombreArchivo;
                $accion->RutaArchivoCongreso = $RutaArchivo;
            }
        }


        $accion->save();
        return "Cambios DG hechos";
    }
    

    public function ObtenerDatosGeneralesAccion($request){
        $idAccion = $request->get('idAccion');
        $accion = AccionesMovilidad::join('estudiantes', 'acciones_movilidads.IdEstudiante', '=', 'estudiantes.id')
                ->join('convenios_movilidads', 'acciones_movilidads.IdConvenio', '=', 'convenios_movilidads.id')
                ->select('acciones_movilidads.id', 'convenios_movilidads.Nombre_Clave', 'IdConvenio', 'convenios_movilidads.Sector', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M',  'IdEstudiante', 'InstitucionOrigen', 'InstitucionDestino', 'ProgramaDestino', 'ProgramaOrigen', 'PeriodoInicio', 'PeriodoConclusion', 'DependenciaOrigen', 'DependenciaDestino', 'Motivo', 'RutaFormatoSolicitud', 'NombreFormatoSolicitud', 'RutaCartaMovilidad', 'NombreCartaMovilidad', 'RutaCartaAceptacion', 'NombreCartaAceptacion', 'RutaReporteActividades', 'NombreReporteActividades', 'RutaDocumentacionComp', 'NombreDocumentacionComp', 'RutaCartaLiberacion', 'NombreCartaLiberacion', 'RutaArchivoCongreso', 'NombreArchivoCongreso')
                ->where('acciones_movilidads.id', '=', $idAccion)->first();
        return $accion;
    }

    public function EliminarMovilidad($request){
        $accion = AccionesMovilidad::find($request->get('idMovilidad'));
        $accion->delete();

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
            rmDir_rf(public_path().'/storage/Documentos/AccionesMovilidad/'.$request->get('idMovilidad'));
        } catch (\Throwable $th) {
            //throw $th;
        }

        return "Registro eliminado";
    }
}
