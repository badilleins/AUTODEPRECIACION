class Tiempo {
    constructor(fecha1,fecha2){
        this.fecha1=fecha1;
        this.fecha2=fecha2;
        this.diferencia = new Date(fecha2).getTime() - new Date(fecha1).getTime();
        this.meses=0;
        this.dias=0;
        this.anios=0;
    }
    

    getTiempo(){
        if(this.calcTiempoDias()>=365){
            return this.getTiempoAnioMesDia();
        }if(this.calcTiempoDias()<365 && this.calcTiempoDias()>30){
            return this.getTiempoMesesDias()
        }
        if(this.calcTiempoDias<30){
            return this.calcTiempoDias();
        }
        else{
            return 0;
        }
    }
    getTiempoMesesDias(){
        let mesesDias=[]
        this.meses = Math.floor(this.calcTiempoDias() / 30.44);
            if(this.calcTiempoDias()%30 > 0){
             this.dias = this.calcTiempoDias()%30;
            }
            mesesDias.push(this.meses,this.dias);
    }
    getTiempoAnioMesDia(){
        let almacenadorTiempo = [];
        const diass = this.calcTiempoDias();
        this.anio = Math.floor(diass/365);
        const diasSobrantes =  diass%365;
        if(diasSobrantes > 0){
            this.meses = Math.floor(diasSobrantes / 30.44);
        }
        if(diass%30 > 0){
            this.dias = diass%30;
           }
        almacenadorTiempo.push(this.anio,this.meses,this.dias);
        return almacenadorTiempo;
    }
    calcTiempoDias(){   
        const dias = Math.round(this.diferencia / (1000 * 60*60*24));
        return dias;
    }
}
class Depreciacion{
    constructor(costoIni,fechaIni,fechaFin){
        this.porcentaje=0.2;
        this.vidaUtil=5;
        this.costoIni=costoIni;
        this.fechaIni=fechaIni;
        this.fechaFin=fechaFin;
    }
    
    getDepreciacion(){
        return this.calcularDepreciacionAcumulada();
    }
    calcularDepreciacionAnual(){
        return this.calcularImporteDespreciable()/this.vidaUtil;
    }
    calcularDepreciacionMensual(){
        return this.calcularDepreciacionAnual()/12;
    }
    calcularDepreciacionDiaria(){
        return this.calcularDepreciacionMensual()/30;
    }

    calcularImporteDespreciable(){
        return this.costoIni - this.calcularValorResidual(); 
    }
    calcularValorResidual()
    {
        return this.costoIni*this.porcentaje;
    }
    calcularDepreciacionAcumulada(){
        const tiempo  = new Tiempo(this.fechaIni,this.fechaFin);   
        if(tiempo.getTiempo()[0] > 5 || (tiempo.getTiempo()[0]==5 && tiempo.getTiempo()[1]>0)){
            return this.calcularValorResidual();
        }
        else if(tiempo.getTiempo()[0]==5 && tiempo.getTiempo()[1]==0){
            let acumulador=0;
            if(tiempo.getTiempo()[2]>0){
                acumulador += this.calcularDepreciacionDiaria();
            }
            acumulador+=this.calcularDepreciacionAnual();
            return acumulador;
        }
        else if(tiempo.getTiempo()[0]<5){
            let acumuladora=0;
                if(tiempo.getTiempo()[1]>0){
                    acumuladora +=  tiempo.meses * this.calcularDepreciacionMensual();
                }
                if(tiempo.getTiempo()[2] > 0){
                    acumuladora += tiempo.dias * this.calcularDepreciacionDiaria()
                }
                acumuladora+= tiempo.anios * this.calcularDepreciacionAnual();
                return acumuladora;
            }
    }
    calcularCostoFinal(){
        return this.costoIni - this.calcularDepreciacionAcumulada();
    }
}


const devolverDepreciacion = () => {
    const costoIni = document.getElementById('costo-inicial').value;
    const fechaIni= new Date(document.getElementById('fecha-inicial').value);
    const fechaFin = new Date(document.getElementById('fecha-final').value);
    const depreciacion = new Depreciacion(costoIni, fechaIni, fechaFin);    
    alert("La depreciación de su vehículo es de:" + depreciacion.getDepreciacion().toFixed(2)  +" \n El precio final del mismo es de: " + depreciacion.calcularCostoFinal().toFixed(2));
}
