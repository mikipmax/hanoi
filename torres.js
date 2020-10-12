window.addEventListener("load", function () {

    var cuadro1 = new Cuadros(true);
    var cuadro2 = new Cuadros(false);
    var cuadro3 = new Cuadros(false);
    var movimientos = 0;
    var fichaSelect;
    var origen;
    var destino;

    function SelectOrigenDestino(cuadro) {
        if (origen === undefined) {
            if (cuadro.tieneFichas()) {
                cuadro.caja.style.borderColor = "red";
                origen = cuadro;
                origen.elegido = true;
            }
        } else if (origen !== undefined && destino === undefined) {
            destino = cuadro;
            destino.elegido = true;
            if (origen !== destino) {
                if (!(destino.tieneFichas()) ||
                        (origen.obtenerFichaSuperior().valor < destino.obtenerFichaSuperior().valor)) {
                    origen.quitarFichaSuperior();
                    origen.redibujarCaja();
                    destino.insertarFichaSuperior();
                    destino.redibujarCaja();
                    movimientos++;
                    actualizarContador();

                }
            }
        }
        if (destino !== undefined && origen !== undefined) {
            reiniciarOrigenDestino();
        }
        if (comprobarVictoria()) {
            victoria();
        }
    }
    function comprobarVictoria() {
        if (cuadro3.contenido[0] instanceof Relleno &&
                cuadro3.contenido[1] instanceof Ficha4 &&
                cuadro3.contenido[2] instanceof Ficha3 &&
                cuadro3.contenido[3] instanceof Ficha2 &&
                cuadro3.contenido[4] instanceof Ficha1) {
            return true;
        } else {
            return false;
        }

    }
    function victoria() {
        var textoTitulo = document.createTextNode("Has ganado");
        var textoSub = document.createTextNode("Movimientos utilizados " + movimientos);
        var textoConsejo = document.createTextNode("Pulsa F5 para jugar de nuevo");
        cuerpo.removeChild(cuadro1.caja);
        cuerpo.removeChild(cuadro2.caja);
        cuerpo.removeChild(cuadro3.caja);
        cuerpo.removeChild(document.getElementById("contador"));

        var titulo = document.createElement("h1");
        titulo.style.color = "red";
        titulo.appendChild(textoTitulo);
        var subtitulo = document.createElement("h2");
        subtitulo.appendChild(textoSub);
        var consejo = document.createElement("h3");
        consejo.appendChild(textoConsejo);
        cuerpo.appendChild(titulo);
        cuerpo.appendChild(subtitulo);
        cuerpo.appendChild(consejo);

    }
    function actualizarContador() {
        var parrafo = document.getElementById("contador");
        parrafo.innerHTML = "Movimientos: " + movimientos;
    }
    function reiniciarOrigenDestino() {
        if (origen !== undefined) {
            origen.caja.style.borderColor = "black";
            origen.elegido = false;
        }
        if (destino !== undefined) {
            destino.caja.style.borderColor = "black";
            destino.elegido = false;
        }


        origen = undefined;
        destino = undefined;
        cuadro1.elegido = false;
        cuadro2.elegido = false;
        cuadro3.elegido = false;
    }
    function Contenido() {
        var caja = document.createElement("div");
        return caja;

    }

    function over(cuadro) {
        cuadro.caja.style.backgroundColor = "purple";
    }

    function over1() {
        over(cuadro1);
    }
    function over2() {
        over(cuadro2);
    }
    function over3() {
        over(cuadro3);
    }

    function out(cuadro) {
        cuadro.caja.style.backgroundColor = "white";
    }
    function out1() {
        out(cuadro1);
    }
    function out2() {
        out(cuadro2);
    }
    function out3() {
        out(cuadro3);
    }

    function click(cuadro) {
        if (cuadro.elegido) {
            SelectOrigenDestino(cuadro);
        } else {
            cuadro.caja.style.borderColor = "black";
            reiniciarOrigenDestino();
        }

    }
    function click1() {
        cuadro1.elegido = !cuadro1.elegido;
        click(cuadro1);
    }
    function click2() {
        cuadro2.elegido = !cuadro2.elegido;
        click(cuadro2);
    }
    function click3() {
        cuadro3.elegido = !cuadro3.elegido;
        click(cuadro3);
    }


    function RellenarContenido() {
        var contenido = new Array();
        for (var i = 0; i < 5; i++) {
            contenido[i] = new Relleno();
        }
        return contenido;
    }

    function RellenarFichas() {
        var contenido = new Array();
        contenido[0] = new Relleno();
        contenido[1] = new Ficha4();
        contenido[2] = new Ficha3();
        contenido[3] = new Ficha2();
        contenido[4] = new Ficha1();
        return contenido;
    }

    function Ficha4() {
        this.caja = Contenido();
        this.caja.style.width = "10%";
        this.caja.style.height = "40px";
       

        this.caja.style.marginLeft = "auto";
        this.caja.style.marginRight = "auto";
        this.valor = 1;
        this.caja.setAttribute("id", "caj");
    }

    function Ficha3() {
        this.caja = Contenido();
        this.caja.style.width = "30%";
        this.caja.style.height = "40px";
         this.caja.setAttribute("id", "caj1");
        this.caja.style.marginLeft = "auto";
        this.caja.style.marginRight = "auto";
        this.valor = 2;
    }

    function Ficha2() {
        this.caja = Contenido();
        this.caja.style.width = "50%";
        this.caja.style.height = "40px";
        this.caja.setAttribute("id", "caj2");
        this.caja.style.marginLeft = "auto";
        this.caja.style.marginRight = "auto";
        this.valor = 3;
    }

    function Ficha1() {
        this.caja = Contenido();
        this.caja.style.width = "70%";
        this.caja.style.height = "40px";
        this.caja.setAttribute("id", "caj3");
        this.caja.style.marginLeft = "auto";
        this.caja.style.marginRight = "auto";
        this.valor = 4;

    }

    function Relleno() {
        this.caja = Contenido();
        this.caja.style.width = "100%";
        this.caja.style.height = "40px";
    }
    function Cuadros(cajaInicial) {
        this.caja = Contenido();
        this.caja.id = "cuad";
        this.caja.style.width = "28%";
        this.caja.style.height = "200px";
        this.caja.style.marginLeft = "4%";
        this.caja.style.borderWidht = "2%";
        this.caja.style.border = "solid black";
        this.caja.style.float = "left";
        this.elegido = false;
        this.contenido;
        if (cajaInicial) {
            this.contenido = RellenarFichas();
        } else {
            this.contenido = RellenarContenido();
        }
        for (var i = 0; i < this.contenido.length; i++) {
            this.caja.appendChild(this.contenido[i].caja);
        }
        this.tieneFichas = function () {
            var rellenos = 0;
            for (var i = 0; i < this.contenido.length; i++) {
                if (this.contenido[i] instanceof Relleno) {
                    rellenos++;
                }
            }
            if (rellenos === this.contenido.length) {
                return false;
            } else {
                return true;
            }

        };
        this.obtenerFichaSuperior = function () {
            for (var i = 0; i < this.contenido.length; i++) {
                if (!(this.contenido[i] instanceof Relleno)) {
                    return this.contenido[i];
                }
            }
        };
        this.quitarFichaSuperior = function () {
            for (var i = 0; i < this.contenido.length; i++) {
                if (!(this.contenido[i] instanceof Relleno)) {
                    fichaSelect = this.contenido[i];
                    this.contenido[i] = new Relleno();
                    break;
                }
            }
        };
        this.insertarFichaSuperior = function () {
            for (var i = this.contenido.length - 1; i >= 0; i--) {
                if (this.contenido[i] instanceof Relleno) {
                    this.contenido[i] = fichaSelect;
                    break;
                }
            }
        };
        this.redibujarCaja = function () {
            while (this.caja.hasChildNodes()) {
                this.caja.removeChild(this.caja.lastChild);
            }
            for (var i = 0; i < this.contenido.length; i++) {
                this.caja.appendChild(this.contenido[i].caja);
            }
        };

    }

    var cuerpo = document.getElementsByTagName("body")[0];
    cuerpo.style.textAlign = "center";
    cuerpo.appendChild(cuadro1.caja);
    cuerpo.appendChild(cuadro2.caja);
    cuerpo.appendChild(cuadro3.caja);
    cuadro1.caja.addEventListener("mouseover", over1, false);
    cuadro2.caja.addEventListener("mouseover", over2, false);
    cuadro3.caja.addEventListener("mouseover", over3, false);

    cuadro1.caja.addEventListener("mouseout", out1, false);
    cuadro2.caja.addEventListener("mouseout", out2, false);
    cuadro3.caja.addEventListener("mouseout", out3, false);

    cuadro1.caja.addEventListener("click", click1);
    cuadro2.caja.addEventListener("click", click2);
    cuadro3.caja.addEventListener("click", click3);

    var texto = document.createTextNode("Movimiento: " + movimientos);
    var parrafo = document.createElement("p");
    parrafo.style.clear = "both";
    parrafo.style.paddingTop = "3em";
    parrafo.setAttribute("id", "contador");
    parrafo.appendChild(texto);
    cuerpo.appendChild(parrafo);
});
