/***********************************************
 * name:Flame Alarm
 * function:
 * Ignite a lighter near the flame sensor.
 * Then the buzzer will beep, 
 * and The LED attached to pin 9 will light up.
 * connection:
 * flame sensor module               Arduino Uno R3
 * D0                                   8
 * VCC                                  5V
 * GND                                  GND
 * Buzzer Module                     Arduino Uno R3
 * SIG                                  10
 * VCC                                  5V
 * GND                                  GND
 ***************************************************/
const int flamePin = 8;   	//Flame sensor module D0 attach to digital 8 
const int ledPin = 9; 		//LED attach to digital 9
const int buzzerPin = 10;   //Buzzer Module attach to digital 10

void setup()
{
  //set the pins state
  pinMode(flamePin,INPUT);
  pinMode(ledPin,OUTPUT);
  pinMode(buzzerPin,OUTPUT);
  digitalWrite(buzzerPin,HIGH);  //本有源蜂鸣器低电平叫，高电平不叫；启动时让之沉默
  Serial.begin(9600);	//initialize serial
}

void loop()
{
  digitalWrite(buzzerPin,HIGH);
  boolean stat = digitalRead(flamePin);
  Serial.print("D0: "); 
  Serial.println(stat); // print to serial monitor 
  Serial.println(" ");  
  
  if(stat == HIGH)   //高电平表示没有检测到火焰
  {
    digitalWrite(ledPin,LOW);
    digitalWrite(buzzerPin,HIGH); //本有源蜂鸣器低电平叫，高电平不叫；没有告警时保持沉默
	//noTone(buzzerPin);          //这个函数不适合有源蜂鸣器

  }

  if(stat == LOW)    //低电平表示没有检测到火焰
  {
    digitalWrite(ledPin,HIGH);
    tone(buzzerPin,320,200);//in buzzerPin generate a tone ,it's frequency is 320hz and the duration of the tone is 200 milliseconds
  }

  delay(500); // used to slow down readings while calibrating 
  
}

