'''

Descripción del Proyecto: Strateger FrontEnd.

#* Resumen:
El "Strateger FrontEnd" es una aplicación React diseñada para gestionar y visualizar alarmas y estrategias de inversión en tiempo real. 
La aplicación se caracteriza por su capacidad para cargar gráficos de velas, recibir y organizar alarmas, y permitir a los usuarios 
controlar las estrategias mediante un sistema intuitivo basado en colores.

#* Funcionalidades Principales:

#! 1. Cargar gráfico de velas:
Inicialmente muestra el gráfico de velas de la primera orden.
Actualiza el gráfico para mostrar el de la orden seleccionada.

#! 2. Gestión de Alarmas:
Recibe las alarmas y las organiza en listas según valores seleccionados por el usuario.
Actualiza la lista de alarmas cada segundo mediante consultas periódicas a la base de datos.

#! 3.Control de Estrategias:
Permite pausar, terminar, iniciar o continuar operando una estrategia utilizando un sistema basado en colores, similar a un semáforo.
Las estrategias se muestran en una lista con una columna de botones para gestionar su estado.

#! 4. Visualización y Gestión en Tablas:
Presenta dos tablas en columnas separadas: una para alarmas activas/inactivas y otra para estrategias activas/inactivas.
Facilita la selección y gestión de estrategias.

#! 5. Información de la Cuenta BingX:
Muestra información relevante de la cuenta BingX del usuario.


#TODO Tecnologías Utilizadas:
- React
- Context API, para manejo de estados globales
- Hooks personalizados, para manejo de estados locales
- Fetch API, para realizar peticiones HTTP
- Tailwind para estilos



'''