const interceptor=new PowerTurret("laser-interceptor");


interceptor.localizedName=Core.bundle.get("block.more-powerful-units-laser-interceptor.name")


var tmpColor = new Color();
var colors = [Color.valueOf("ec745855"), Color.valueOf("ec7458aa"), Color.valueOf("ff9c5a"), Color.white];
var tscales = [1, 0.7, 0.5, 0.2];
var strokes = [2, 1.5, 1, 0.3];
var lenscales = [1, 1.12, 1.15, 1.17];
var length = 240;



interceptor.shootType = extend(BasicBulletType,{
  init(b){
    if (b==null) return;
    Damage.collideLine(b,b.getTeam(),Fx.hitMeltdown,b.x,b.y,b.rot(),length,true);
    Effects.shake(1,1,b.x,b.y);
  },
  hit(b,hitx,hity){
    Effects.effect(Fx.hitMeltdown,colors[2],hitx,hity);

  },
  draw(b){
    baseLen=(length)*b.fout();

    Lines.lineAngle(b.x,b.y,b.rot(),baseLen);
    for(var s=0; s<colors.length; s++){
      Draw.color(tmpColor.set(colors[s]).mul(1+Mathf.absin(Time.time(),1,0.1)));
      for(var i=0;i<tscales.length;i++){
        Tmp.v1.trns(b.rot()+180,(lenscales[i]-1)*35);
        Lines.stroke((4+Mathf.absin(Time.time(),0.8,1.5))*b.fout()*strokes[s]*tscales[i]);
        Lines.lineAngle(b.x+Tmp.v1.x,b.y+Tmp.v1.y,b.rot(),baseLen*lenscales[i],CapStyle.none);
      }
    }
    Draw.reset();
  }

});
interceptor.shootType.hitSize=4;
interceptor.shootType.despawnEffect=Fx.none;
interceptor.shootType.hitEffect=Fx.hitMeltdown;
interceptor.shootType.damage=10;
interceptor.shootType.pierce=true;
interceptor.shootType.speed=0.001;
interceptor.shootType.lifetime=16;
interceptor.shootType.drawSize=420;
