//Digital Read with button

#include <Arduino_LSM9DS1.h>

const int pot1 = A0; //for future potentiometer use
const int smoothAmt = 50;

int potVal1;
int smooth1[smoothAmt];
int av[2];

int pushButton1 = 11;
int buttonState1 = 0;

int pushButton2 = 10;
int buttonState2 = 0;

int pushButton3 = 9;
int buttonState3 = 0;

int pushButton4 = 8;
int buttonState4 = 0;


void setup(){

  Serial.begin(9600);

  pinMode(pushButton1, INPUT); //make button1 an input
  pinMode(pushButton2, INPUT); //make button2 an input
  pinMode(pushButton3, INPUT); //make button3 an input
  pinMode(pushButton4, INPUT); //make button4 an input
}

void loop(){

  int buttonState1 = digitalRead(pushButton1); //read input pin
  int buttonState2 = digitalRead(pushButton2); //read input pin
  int buttonState3 = digitalRead(pushButton3); //read input pin
  int buttonState4 = digitalRead(pushButton4); //read input pin
  
  Serial.print(buttonState1);
  Serial.print(",");
  Serial.print(buttonState2);
  Serial.print(",");
  Serial.print(buttonState3);
  Serial.print(",");
  Serial.println(buttonState4);

  delay(100);
}
